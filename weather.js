const appid = "bbeb94a0d34c88951a762a3585cf1b1c";
class currentWeather {
	constructor(requestType, city, units) {
		let request = new XMLHttpRequest();
		let http = "http://api.openweathermap.org/data/2.5/weather?appid=" + appid + "&lang=en&units=" + units;
		switch (requestType) {
			case "q":
				http += "&q=" + city;
				break;
			case "id":
				http += "&id=" + city;
				break;
			case "coord":
				http += "&lon=" + city.lon + "&lat=" + city.lat; 
				break;
		}
		request.open("GET", http, false);
		request.send();
		if (request.status != 200) {
			alert(request.status + ': ' + request.statusText);
		} else {
			let answer = JSON.parse(request.responseText);
			for (let key in answer) {
				this[key] = answer[key];
			}

			this.wind.diraction = currentWeather.prototype.degToDiraction(this.wind.deg);
			this.units = units;
		}
	}
	degToDiraction(deg) {
		if (deg > 22.5 && deg <= 67.5) {
			return "NE";
		} else if (deg <= 112.5) {
			return "E";
		} else if (deg <= 157.5) {
			return "SE";
		} else if (deg <= 202.5) {
			return "S";
		} else if (deg <= 247.5) {
			return "SW";
		} else if (deg <= 292.5) {
			return "W";
		} else if (deg <= 337.5) {
			return "NW";
		} else {
			return "N";
		}
	}
	toString(options) {
		let parameteres = [];
		if (options.description) {
			let randomChoice = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
			if (this.weather[0].main == "Clouds") {
				parameteres.push("There are " + this.weather[0].description + ".");
			} else {
				if (randomChoice) {
					parameteres.push("Today in " + this.name + " is " + this.weather[0].description + ".");
				} else {
					parameteres.push("The weather in " + this.name + " is " + this.weather[0].description + ".");
				}
			}
		}
		function selectUnit(unit, type) {
			if (type == "temp") {
				switch (unit) {
					case "standard":
						return "Kelvin";
					case "metric":
						return"Celsuis";
					case "imperial":
						return "Fahrenheit";
				}
			} else {
				switch (unit) {
					case "standard":
						return "meter/sec";
					case "metric":
						return "meter/sec";
					case "imperial":
						return "miles/hour";
				}
			}
		}
		if (options.temp) {
			parameteres.push("The temperature is " + this.main.temp + " degrees " + selectUnit(this.units, "temp") + ".");
		}
		if (options.pressure) {
			parameteres.push("The pressure is " + this.main.pressure + " hectopascals.");
		}
		if (options.humidity) {
			parameteres.push("The humidity is " + this.main.humidity + "%.");
		}
		if (options.temp_min) {
			parameteres.push("The minimum temperature at the moment is " + this.main.temp_min + ".");
		}
		if (options.temp_max) {
			parameteres.push("The maximum temperature at the moment is " + this.main.temp_max + ".");
		}
		if (options.wind) {
			if (options.wind.speed) {
				parameteres.push("The wind speed is " + this.wind.speed + " " + selectUnit(this.units, "wind") + ".");
			}
			if (options.wind.diraction) {
				switch (this.wind.diraction) {
					case "NE":
						var diraction = "northeast";
						break;
					case "E":
						var diraction = "east";
						break;
					case "SE":
						var diraction = "southeast";
						break;
					case "S":
						var diraction = "south";
						break;
					case "SW":
						var diraction = "southwest";
						break;
					case "W":
						var diraction = "west";
						break;
					case "NW":
						var diraction = "northwest";
						break;
					case "N":
						var diraction = "north";
						break;
				}
				parameteres.push("The wind diraction is " + diraction + ".");
			}
			if (options.wind.deg) {
				if (options.wind.diraction) {
					let last = parameteres[parameteres.length - 1];
					last = last.slice(0, last.length - 1);
					last += " and " + this.wind.deg + " degrees.";
					parameteres[parameteres.length - 1] = last;
				} else {
					parameteres.push("The wind diraction is " + this.wind.deg + " degrees.");
				}
			}
		}
		if (options.clouds) {
			parameteres.push("The cloudness is " + this.clouds.all + "%.");
		}
		let string = "";
		for (let i in parameteres) {
			string += (parameteres[i] + " ");
		}
		return string;
	}
}