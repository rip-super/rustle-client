const header = document.getElementById("header");
const searchButton = document.getElementById("searchButton");
const container = document.getElementById("container");
const superContainer = document.getElementById("superContainer");
const searchInput = document.getElementById("searchInput");
const resultList = document.getElementById("resultList");
const homeButton = document.getElementById("homeButton");

homeButton.id = "homeButton";

async function getResults(query) {
    try {
        const invoke = window.__TAURI__.core.invoke
        const results = await invoke("search_websites", { query });
        return results;
    } catch (e) {
        console.error("Error fetching results:", e);
        return [];
    }
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
    return new Promise((res) => {
        element.style.opacity = 0;
        setTimeout(res, delay);
    });
}

async function fadeIn(element, delay) {
    return new Promise((res) => {
        element.style.opacity = 1;
        setTimeout(res, delay);
    });
}

window.addEventListener("load", () => {
    void superContainer.offsetWidth;

    setTimeout(() => {
        superContainer.style.opacity = 1;
    }, 500);
});

document.addEventListener("keydown", (key) => {
    if (key.code == "Enter") {
        searchButton.click();
    }
});

searchButton.addEventListener("click", async () => {
    if (searchInput.value == "") {
        return;
    }

    const query = searchInput.value;

    if (resultList.style.opacity == "1") {
        await fadeOut(resultList, 250);
        const results = await getResults(query);
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

    const onTransitionEnd = (e) => {
        if (e.propertyName === "width") {
            homeButton.style.opacity = 1;
            searchInput.removeEventListener("transitionend", onTransitionEnd);
        }
    };

    searchInput.addEventListener("transitionend", onTransitionEnd);
    searchInput.style.width = "50vw";

    const results = await getResults(query);
    showResults(results);
});

homeButton.addEventListener("click", async () => {
    document.body.style.overflow = "hidden";

    await fadeOut(superContainer, 100);

    setTimeout(() => {
        document.location.reload();
    }, 750);
});
