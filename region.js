class Region {
    constructor(name, id, lat, lon, country) {
        this.name = name;
        this.id = id;
		this.lat = lat;
		this.lon = lon;
        this.country = country;
    }
	render() {
		let tr = new Tr("tr", [{innerHTML: this.name}, {innerHTML: this.lat + String.fromCharCode(176)}, {innerHTML: this.lon + String.fromCharCode(176)}, {innerHTML: this.country}], {regionId: this.id});
		this.tr = tr;
	}
}
class RegionTable extends Table { //no headers
	constructor(tr, options) {
		super(tr, options);
	}
	render() {
		super.render();
		this.elem.addEventListener("click", function(event) {
			let target = event.target;
			target = target.closest("tr");
			target.className = "selected";
			sayWeatherUserData.regionId = target.getAttribute("regionId");
		});
	}
}
function searchRegion(city) {
	let request = new XMLHttpRequest();
	request.open("GET", "http://api.openweathermap.org/data/2.5/find?type=like&appid=" + sayWeatherUserData.weatherApiKey + "&q=" + city, true);
	request.send();
	request.timeout = 30000;
	request.ontimeout = function() {
		alert("Извините, запрос превысил максимальное время");
	}
	request.onreadystatechange = function() {
		if (request.readyState != 4) return;
		console.log("data getted");
		if (request.status == 200) {
			console.log("date getted successfully");
			let answer = JSON.parse(request.responseText);
			if (answer.count >= 1) {
				let cities = [];
				for (let i in answer.list) {
					cities.push(new Region(answer.list[i].name, answer.list[i].id, answer.list[i].coord.lat, answer.list[i].coord.lon, answer.list[i].sys.country));
				}
				console.log(cities);
				return cities;
			} else {
				alert("Sorry, this city is not found.");
			}
		} else {
			alert("Error: " + request.status + ' : ' + request.statusText);
		}
	}
}
class SearchRegionForm extends Form{
	constructor() {
		super("searchRegionForm",
			[new Search("searchRegionName", "City")], 
			"Search City for weather",
			function(event) {
				event.preventDefault();
				let value = document.forms.searchRegionForm.elements.searchRegionName.value;
				if (value) {
					let request = new XMLHttpRequest();
					request.open("GET", "http://api.openweathermap.org/data/2.5/find?type=like&appid=" + sayWeatherUserData.weatherApiKey + "&q=" + value, true);
					request.send();
					request.timeout = 20000;
					request.ontimeout = function() {
						alert("Извините, запрос превысил максимальное время");
					}
					request.onreadystatechange = function() {
						if (request.readyState != 4) return;
						console.log("data getted");
						if (request.status == 200) {
							console.log("date getted successfully");
							let answer = JSON.parse(request.responseText);
							if (answer.count >= 1) {
								let cities = [];
								for (let i in answer.list) {
									cities.push(new Region(answer.list[i].name, answer.list[i].id, answer.list[i].coord.lat, answer.list[i].coord.lon, answer.list[i].sys.country));
								}
								console.log(cities);
								let tr = [];
								for (let i in cities) {
									cities[i].render();
									tr.push(cities[i].tr);
								}
								let table = new RegionTable(tr, {id: "searchedRegions"});
								this.table = table;
								document.forms.searchRegionForm.appendChild(table.elem);
							} else {
								alert("Sorry, this city is not found.");
							}
						} else {
							alert("Error: " + request.status + ' : ' + request.statusText);
						}
					}
				}
		});
	}
	render() {
		super.render();
	}
}