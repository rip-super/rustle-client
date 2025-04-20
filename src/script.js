const header = document.getElementById("header");
const searchButton = document.getElementById("searchButton");
const container = document.getElementById("container");
const superContainer = document.getElementById("superContainer");
const searchInput = document.getElementById("searchInput");
const resultList = document.getElementById("resultList");

const results = [
    {
        title: "Mozilla",
        url: "www.mozilla.org",
        description: "An open-source software community that promotes open standards and privacy on the web."
    },
    {
        title: "OpenAI",
        url: "www.openai.com",
        description: "An artificial intelligence research organization aiming to ensure that AI benefits all of humanity."
    },
    {
        title: "Wikipedia",
        url: "www.wikipedia.org",
        description: "A free online encyclopedia with articles collaboratively written by volunteers around the world."
    },
    {
        title: "Google",
        url: "www.google.com",
        description: "A widely used search engine that helps users find information across the internet."
    },
    {
        title: "GitHub",
        url: "www.github.com",
        description: "A web-based platform for version control and collaborative software development using Git."
    },
    {
        title: "Stack Overflow",
        url: "www.stackoverflow.com",
        description: "A question-and-answer website for professional and enthusiast programmers."
    },
    {
        title: "Khan Academy",
        url: "www.khanacademy.org",
        description: "A nonprofit educational platform offering free online courses, lessons, and practice."
    },
    {
        title: "Coursera",
        url: "www.coursera.org",
        description: "An online learning platform that offers courses from universities and organizations worldwide."
    },
    {
        title: "Reddit",
        url: "www.reddit.com",
        description: "A social news aggregation, web content rating, and discussion website."
    },
    {
        title: "LinkedIn",
        url: "www.linkedin.com",
        description: "A professional networking site that connects job seekers with employers and industry professionals."
    },
    {
        title: "YouTube",
        url: "www.youtube.com",
        description: "A video sharing platform where users can upload, share, and view videos."
    },
    {
        title: "Twitter",
        url: "www.twitter.com",
        description: "A microblogging platform where users post and interact with messages known as 'tweets'."
    },
    {
        title: "Trello",
        url: "www.trello.com",
        description: "A collaboration tool that organizes your projects into boards for easy task management."
    },
    {
        title: "Netflix",
        url: "www.netflix.com",
        description: "A streaming service that offers a wide variety of TV shows, movies, and documentaries."
    },
    {
        title: "Amazon",
        url: "www.amazon.com",
        description: "An online marketplace offering everything from books and electronics to groceries and apparel."
    },
    {
        title: "Quora",
        url: "www.quora.com",
        description: "A question-and-answer website where questions are asked, answered, and edited by Internet users."
    },
    {
        title: "Dropbox",
        url: "www.dropbox.com",
        description: "A cloud-based file storage service for file sharing and collaboration."
    },
    {
        title: "Figma",
        url: "www.figma.com",
        description: "A collaborative web-based interface design tool for teams and individuals."
    },
    {
        title: "Medium",
        url: "www.medium.com",
        description: "An online publishing platform for sharing articles, ideas, and stories."
    },
    {
        title: "Dev.to",
        url: "www.dev.to",
        description: "A community of software developers sharing ideas, tutorials, and discussion."
    },
    {
        title: "CodePen",
        url: "www.codepen.io",
        description: "An online code editor and social development environment for front-end designers and developers."
    },
    {
        title: "Product Hunt",
        url: "www.producthunt.com",
        description: "A website that lets users share and discover new products, startups, and technology."
    },
    {
        title: "Dribbble",
        url: "www.dribbble.com",
        description: "A platform for designers to showcase their work and get feedback from the community."
    },
    {
        title: "Behance",
        url: "www.behance.net",
        description: "An online platform to showcase and discover creative work in design, photography, and illustration."
    },
    {
        title: "Slack",
        url: "www.slack.com",
        description: "A messaging app for teams that helps streamline communication and collaboration."
    },
    {
        title: "Notion",
        url: "www.notion.so",
        description: "An all-in-one workspace for notes, tasks, databases, and wikis used by individuals and teams."
    },
    {
        title: "Zoom",
        url: "www.zoom.us",
        description: "A video conferencing platform for virtual meetings, webinars, and online collaboration."
    },
    {
        title: "Discord",
        url: "www.discord.com",
        description: "A voice, video, and text chat platform for communities, gaming groups, and workspaces."
    },
    {
        title: "Spotify",
        url: "www.spotify.com",
        description: "A music streaming service offering millions of songs, playlists, and podcasts."
    },
    {
        title: "Pixabay",
        url: "www.pixabay.com",
        description: "A free resource for high-quality images, videos, and illustrations shared by creators."
    },
    {
        title: "Unsplash",
        url: "www.unsplash.com",
        description: "A platform offering freely usable high-resolution photos gifted by the world’s best photographers."
    },
    {
        title: "Canva",
        url: "www.canva.com",
        description: "An online design tool for creating social media graphics, presentations, posters, and more."
    },
    {
        title: "Hacker News",
        url: "news.ycombinator.com",
        description: "A social news website focused on computer science and entrepreneurship."
    },
    {
        title: "TechCrunch",
        url: "www.techcrunch.com",
        description: "A technology news site that profiles startups, reviews new Internet products, and reports on tech news."
    },
    {
        title: "The Verge",
        url: "www.theverge.com",
        description: "A multimedia platform that covers the intersection of technology, science, art, and culture."
    },
    {
        title: "Mashable",
        url: "www.mashable.com",
        description: "A digital media website that covers technology, digital culture, and entertainment content."
    },
    {
        title: "W3Schools",
        url: "www.w3schools.com",
        description: "A web developer's site for learning HTML, CSS, JavaScript, and more."
    },
    {
        title: "MDN Web Docs",
        url: "developer.mozilla.org",
        description: "Resources for developers, by developers, to learn web technologies including HTML, CSS, and JavaScript."
    },
    {
        title: "Codewars",
        url: "www.codewars.com",
        description: "A platform where developers train on coding challenges called kata to sharpen their skills."
    },
    {
        title: "LeetCode",
        url: "www.leetcode.com",
        description: "A platform for coding practice and technical interview preparation."
    },
    {
        title: "HackerRank",
        url: "www.hackerrank.com",
        description: "A platform that helps developers improve their coding skills and companies hire tech talent."
    },
    {
        title: "Replit",
        url: "www.replit.com",
        description: "An online IDE to instantly write, run, and share code in many programming languages."
    },
    {
        title: "DigitalOcean",
        url: "www.digitalocean.com",
        description: "A cloud infrastructure provider offering cloud services for deploying and scaling applications."
    },
    {
        title: "Heroku",
        url: "www.heroku.com",
        description: "A platform as a service (PaaS) that enables developers to build, run, and operate applications entirely in the cloud."
    },
    {
        title: "Vercel",
        url: "www.vercel.com",
        description: "A platform for frontend developers to deploy websites and web apps with ease."
    },
    {
        title: "Netlify",
        url: "www.netlify.com",
        description: "A platform for automating web projects with continuous deployment and modern tools."
    },
    {
        title: "Cloudflare",
        url: "www.cloudflare.com",
        description: "A web infrastructure and website security company providing content delivery and DDoS mitigation."
    },
    {
        title: "Namecheap",
        url: "www.namecheap.com",
        description: "A domain registrar and web hosting company offering affordable internet services."
    },
    {
        title: "Medium Daily Digest",
        url: "www.medium.com/tag/technology",
        description: "A curated feed of technology-related stories and articles from Medium."
    },
    {
        title: "Smashing Magazine",
        url: "www.smashingmagazine.com",
        description: "An online magazine for web designers and developers with resources, tutorials, and articles."
    },
    {
        title: "SitePoint",
        url: "www.sitepoint.com",
        description: "A hub for web developers to learn programming, design, UX, and more."
    }
];

async function getResults() {
    // simulate getting results from rust
    return results
}

async function showResults(results) {
    resultList.style.opacity = 0;
    resultList.innerHTML = "";
    
    results.forEach(result => {
        let li = document.createElement("li");
        li.innerHTML = `
        <div class="search-result">
            <h3 class="result-title">
            <a href="https://${result.url}" class="result-link">${result.title}</a>
            <span class="result-url">${result.url}</span>
            </h3>
            <p class="result-description">${result.description}</p>
        </div>
        `;
        resultList.appendChild(li);
    });
    
    setTimeout(() => {
        resultList.style.opacity = 1;
    }, 500);
}

async function fadeOut(element, delay) {
    return new Promise((resolve) => {
        element.style.opacity = 0;
        setTimeout(resolve, delay);
    });
}

async function fadeIn(element, delay) {
    return new Promise((resolve) => {
        element.style.opacity = 1;
        setTimeout(resolve, delay);
    });
}

searchButton.addEventListener("click", async () => {
    if (searchInput.value == "") {
        return;
    }
    
    if (resultList.style.opacity == 1) {
        await fadeOut(resultList, 250);
        let results = await getResults();
        showResults(results);
        return;
    }
    
    await fadeOut(superContainer, 100);
    resultList.style.opacity = 0;
    header.style.display = "none";
    searchInput.style.display = "block";
    superContainer.style.justifyContent = "flex-start";
    container.style.alignItems = "left";
    container.style.height = "75px";
    container.style.padding = "0";
    header.style.marginBottom = "10px";
    resultList.style.display = "block";
    
    await fadeIn(superContainer, 100);
    
    await new Promise((res) => {
        setTimeout(() => {
            searchInput.style.width = "50vw";
            res();
        }, 0);
    });
    
    showResults(results);
});

document.addEventListener("keydown", (key) => {
    if (key.code == "Enter") {
        searchButton.click();
    }
});