

let quoteText = document.getElementById("quoteText");
fetch("./static/json/quote.json")
    .then((response) => response.json())
    .then((json) => setText(json));

function setText(json) {

    quoteText.innerHTML = json.quote[Math.floor(Math.random()*json.quote.length)];
}

function redirect() {
    window.location = "https://wa.me/?text=%68%74%74%70%73%3a%2f%2f%64%69%6e%6f%2d%74%68%65%2d%70%72%6f%67%72%61%6d%65%72%2e%67%69%74%68%75%62%2e%69%6f%2f%4d%65%72%72%79%43%68%72%69%73%74%6d%61%73%2f";
}

let audio = new Audio("/static/audio/jinglebells.mp3");

window.addEventListener("click", () => {
    audio.volume = 0.5;
    audio.play();
    document.getElementById("clickQuery").style.color = "#00000000";
});