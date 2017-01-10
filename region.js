class Region {
    constructor(name, id, country) {
        this.name = name;
        this.id = id;
        this.country = country;
    }
	render() {
		let tr = new Tr("tr", [{innerHTML: this.name}, {innerHTML: this.country}]);
		this.tr = tr;
	}
}
function searchRegion(city) {
    let request = new XMLHttpRequest();
    request.open("GET", "http://api.openweathermap.org/data/2.5/find?type=like&appid=" + weatherApiKey + "&q=" + city, false);
    request.send();
    if (request.status != 200) {
		alert(request.status + ': ' + request.statusText);
    } else {
		let answer = JSON.parse(request.responseText);
		console.log(answer);
		if (answer.count >= 1) {
			let cities = [];
			for (let i in answer.list) {
				cities.push(new Region(answer.list[i].name, answer.list[i].id, answer.list[i].sys.country));
			}
			return cities;
		} else {
			alert("Sorry, this city is not found.");
		}
    }
}
class RegionTable { //no headers
	constructor(tr, options) {
		this.tr = tr;
		if (options) {
			this.options = options;
		}
		this.render();
	}
	render() {
		let table = new Table(this.tr, {id: "regionTable"});
		this.table = table;
	}
}