async function getCatImage() {
    const response = await fetch(
        "https://api.thecatapi.com/v1/images/search"
    );

    const data = await response.json();

    return data[0].url;
}

async function replaceImages() {

    const catImage = await getCatImage();

    document.querySelectorAll("img").forEach(img => {

        if (!img.dataset.catified) {

            img.src = catImage;
            img.srcset = "";
            img.dataset.catified = "true";
        }
    });
}

replaceImages();

const observer = new MutationObserver(() => {
    replaceImages();
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});