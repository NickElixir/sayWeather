let menu = new Menu([new Li("home", {key: "main"}), new Li("timer", {key: "timer"}), new Li("loop", {key: "loopTimer"})]);
document.body.appendChild(menu.elem);

let div = document.createElement("div");
div.className = "container";
let loadingIcon = document.createElement("div");
loadingIcon.innerHTML = '<div class="cssload-wrapper"><div class="cssload-dots"></div></div>';
loadingIcon.className = "invisible";
let header = new Header([loadingIcon]);
document.body.appendChild(header.elem);

let section = document.createElement("section");
section.id = "main";
section.className = "visible";
section.appendChild(Form.createSearchRegion().elem);

let button = document.createElement("div");
button.className = "button";
button.innerHTML = "weatherToSpeech";
button.style.backgroundColor = "#67E";
button.addEventListener("click", function() {
    let weather = new currentWeather("id", sayWeatherUserData.regionId, "metric").toSpeech();
});
section.appendChild(button);
div.appendChild(section);

section = document.createElement("section");
section.id = "timer";
section.className = "invisible";
section.appendChild(Form.speechTimer().elem);
div.appendChild(section);

section = document.createElement("section");
section.id = "loopTimer";
section.className = "invisible";
section.appendChild(Form.speechLoop().elem);
div.appendChild(section);

document.body.appendChild(div);