// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use rust_stemmers::{Algorithm, Stemmer};
use serde::Serialize;
use std::collections::HashSet;
use std::error::Error;
use std::fs::File;
use std::io::{BufRead, BufReader};
use tauri::{LogicalSize, Manager};

#[derive(Serialize)]
struct WebsiteEntry {
    title: String,
    url: String,
    description: String,
}

fn load_stopwords(path: &str) -> Result<HashSet<String>, Box<dyn Error>> {
    let file = File::open(path)?;
    let reader = BufReader::new(file);

    let stopwords: HashSet<String> = reader
        .lines()
        .collect::<Result<Vec<_>, _>>()?
        .into_iter()
        .map(|w| w.trim().to_lowercase())
        .filter(|w| !w.is_empty())
        .collect();

    Ok(stopwords)
}

fn parse_query(query: &str, stopwords: &HashSet<String>, stemmer: &Stemmer) -> HashSet<String> {
    query
        .to_lowercase()
        .split(|c: char| !c.is_alphanumeric())
        .filter(|token| !token.is_empty())
        .filter(|token| !stopwords.contains(*token))
        .map(|token| stemmer.stem(token).to_string())
        .collect()
}

#[tauri::command]
fn search_websites(query: String) -> Result<Vec<WebsiteEntry>, String> {
    let stopwords = load_stopwords("stopwords.txt").map_err(|e| e.to_string())?;
    let stemmer = Stemmer::create(Algorithm::English);

    let query_words = parse_query(&query, &stopwords, &stemmer);
    if query_words.is_empty() {
        return Ok(vec![]);
    }

    let inverted_file = File::open("../data/inverted_index.csv").map_err(|e| e.to_string())?;
    let inverted_reader = BufReader::new(inverted_file);

    let mut doc_ids = HashSet::new();

    for (i, line_result) in inverted_reader.lines().enumerate() {
        let line = line_result.map_err(|e| e.to_string())?;
        if i == 0 {
            continue;
        }

        let mut parts = line.splitn(2, ',');
        if let (Some(word), Some(doc_ids_str)) = (parts.next(), parts.next()) {
            let word_stemmed = stemmer.stem(&word.to_lowercase()).to_string();

            if query_words.contains(&word_stemmed) {
                let clean_ids = doc_ids_str.trim_matches('"');
                for doc_id in clean_ids.split(',') {
                    doc_ids.insert(doc_id.trim().to_string());
                }
            }
        }
    }

    let websites_file = File::open("../data/websites.csv").map_err(|e| e.to_string())?;
    let websites_reader = BufReader::new(websites_file);

    let query_lower = query.to_lowercase();
    let query_words_set: HashSet<_> = query_lower
        .split_whitespace()
        .map(|w| w.trim_matches(|c: char| !c.is_alphanumeric()))
        .filter(|w| !w.is_empty())
        .collect();

    let mut matching_entries = Vec::new();

    for (i, line_result) in websites_reader.lines().enumerate() {
        let line = line_result.map_err(|e| e.to_string())?;
        if i == 0 {
            continue;
        }

        let fields: Vec<&str> = line.splitn(5, ',').collect();
        if fields.len() < 5 {
            continue;
        }

        let doc_id = fields[0].trim();
        if doc_ids.contains(doc_id) {
            let pagerank = fields[3].trim().parse::<f64>().unwrap_or(0.0);
            let title = fields[2].to_lowercase();
            let description = fields[4].to_lowercase();

            let mut boost_score = 0;
            for qw in &query_words_set {
                if title.contains(qw) || description.contains(qw) {
                    boost_score += 1;
                }
            }

            matching_entries.push((
                boost_score,
                pagerank,
                fields[2].trim().to_string(),
                fields[1].trim().to_string(),
                fields[4].trim().to_string(),
            ));
        }
    }

    matching_entries.sort_by(|a, b| {
        b.0.cmp(&a.0)
            .then_with(|| b.1.partial_cmp(&a.1).unwrap_or(std::cmp::Ordering::Equal))
    });

    let results = matching_entries
        .into_iter()
        .take(50)
        .map(|(_, _, title, url, description)| {
            let cleaned_url = if url.starts_with("https://https//") {
                url.replacen("https://https//", "https://", 1)
            } else {
                url.to_string()
            };

            let should_truncate = cleaned_url.to_lowercase().contains("wikipedia");
            let final_description = if should_truncate {
                description
                    .split_whitespace()
                    .skip(10)
                    .take(25)
                    .collect::<Vec<_>>()
                    .join(" ")
            } else {
                description
            };

            WebsiteEntry {
                title,
                url: cleaned_url,
                description: final_description,
            }
        })
        .collect();

    Ok(results)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![search_websites])
        .setup(|app| {
            let window = app.get_webview_window("main").unwrap();

            let monitor = window.primary_monitor().unwrap().unwrap();
            let size = monitor.size();
            let mut new_width = size.width as f64 * (1280.0 / 3440.0);
            let mut new_height = size.height as f64 * (720.0 / 1440.0);

            if new_width < 800.0 || new_height < 450.0 {
                new_width = 800.0;
                new_height = 450.0;
            }

            window
                .set_size(LogicalSize::new(new_width, new_height))
                .unwrap();

            window.center().unwrap();
            window.show().unwrap();

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
