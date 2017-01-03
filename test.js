function testRequest() {
	var request = new XMLHttpRequest();
	var key = "bbeb94a0d34c88951a762a3585cf1b1c";
	request.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=Moscow&appid=" + key, false);
	request.send();
	if (request.status != 200) {
	alert(request.status + ': ' + request.statusText);
	} else {
	alert(request.responseText);
	}
}
var moscow = new currentWeather("q", "Moscow", "standard");
console.log(moscow);
let p = document.createElement("p");
p.innerHTML = moscow.toString({ description: true, temp: true, pressure: true, humidity: true, temp_min: true, temp_max: true, sea_level: true, grnd_level: true, wind: {speed: true, deg: true, diraction: true}, clouds: {all: true}});
document.body.appendChild(p);