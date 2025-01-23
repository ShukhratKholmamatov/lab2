counter = 0;
function theme() {
    counter++;
    let body = document.getElementById("body");
    let content = document.getElementById("content");
    let half = document.getElementById("half");
    let bigf = document.getElementById("bigf");
    let moon = document.getElementById("moon");
    let sun = document.getElementById("sun");

    
    if (counter%2 == 1) {
        moon.style.display = "block";
        sun.style.display = "none";
        body.style.backgroundColor = "#000";
        content.style.color = "#fff";
        bigf.style.color = "#fff";
        half.style.backgroundColor = "#fff";
    } else {
        moon.style.display = "none";
        sun.style.display = "block";
        body.style.backgroundColor = "#fff";
        content.style.color = "#000";
        bigf.style.color = "#000";
        // half.style.backgroundColor = "#000";
    }
    
}