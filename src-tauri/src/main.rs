// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
// #[tauri::command]
// fn greet(name: &str) -> String {
//     format!("Hello, {}! You've been greeted from Rust!", name)
// }

use tauri::{LogicalSize, Manager};

fn main() {
    tauri::Builder::default()
        //.plugin(tauri_plugin_opener::init())
        //.invoke_handler(tauri::generate_handler![greet])
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
