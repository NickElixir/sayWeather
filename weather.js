class currentWeather {
	constructor(weatherRequestType, city) {
		let http = "http://api.openweathermap.org/data/2.5/weather?appid=" +sayWeatherUserData.weatherApiKey + "&lang=" + sayWeatherUserData.language + "&units=" + sayWeatherUserData.units;
		switch (weatherRequestType) {
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
		let request = new XMLHttpRequest();
		request.open("GET", http, false);
		request.send();
		console.log("Data getted");
		document.body.querySelector(".cssload-wrapper").classList.toggle("invisible");
		if (request.status == 0) {
			alert("No Internet Connection. Please check settings.");
			document.body.querySelector(".cssload-wrapper").classList.toggle("invisible");
		} else if (request.status != 200) {
			alert(request.status + ': ' + request.statusText);
			document.body.querySelector(".cssload-wrapper").classList.toggle("invisible");
		} else {
			console.log("Date getted succesfully");
			let answer = JSON.parse(request.responseText);
			for (let key in answer) {
				this[key] = answer[key];
			}
			this.wind.diraction = currentWeather.prototype.degToDiraction(this.wind.deg);
			this.units = sayWeatherUserData.units;
			document.body.querySelector(".cssload-wrapper").classList.toggle("invisible");
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
		if(!options) {
			var options = {description: true, temp: true, pressure: true, humidity: true, temp_min: true, temp_max: true, sea_level: true, grnd_level: true, wind: {speed: true, deg: true, diraction: true}, clouds: {all: true}};
		}
		options.untis = sayWeatherUserData.units;
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
			parameteres.push("The temperature is " + this.main.temp + " degrees " + selectUnit(options.units, "temp") + ".");
		}
		if (options.pressure) {
			parameteres.push("The pressure is " + this.main.pressure + " hectopascals.");
		}
		if (options.humidity) {
			parameteres.push("The humidity is " + this.main.humidity + "%.");
		}
		if (options.temp_min && options.temp_max) {
			parameteres.push("The minimum temperature now is " + this.main.temp_min + " and maximum is " + this.main.temp_min + ".");
		} else {
			if (options.temp_min) {
				parameteres.push("The minimum temperature at the moment is " + this.main.temp_min + ".");
			} else {
				parameteres.push("The maximum temperature at the moment is " + this.main.temp_max + ".");
			}
		}
		if (options.wind) {
			if (options.wind.speed) {
				parameteres.push("The wind speed is " + this.wind.speed + " " + selectUnit(options.units, "wind") + ".");
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
				if (options.wind.deg) {
					parameteres.push("The wind diraction is " + diraction + " and " + this.wind.deg + " degrees.");
				} else {
					parameteres.push("The wind diraction is " + diraction + ".");
				}
			}
			if (options.wind.deg && !options.wind.diraction) {
				parameteres.push("The wind diraction is " + this.wind.deg + " degrees.");
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
	toSpeech() {
		VoiceRSS.speech({
            key: sayWeatherUserData.voiceApiKey,
			src: this.toString(),
            hl: 'en-us',
            r: 0, 
            c: 'mp3',
            f: '44khz_16bit_stereo',
            ssml: false
        });
	}
}