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
class RegionTable extends Table { //no headers
	constructor(tr, options) {
		super(tr, options);
	}
	render() {
		super.render();
	}
}
function searchRegion(city) {
		let request = new XMLHttpRequest();
		request.open("GET", "http://api.openweathermap.org/data/2.5/find?type=like&appid=" + weatherApiKey + "&q=" + city, false);
		request.send();
		if (request.status != 200) {
			alert("Error: " + request.status + ' : ' + request.statusText);
		} else {
			let answer = JSON.parse(request.responseText);
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
class SearchRegionForm extends Form{
	constructor() {
		super("searchRegionForm",
			[new Search("searchRegionName", "City")], 
			"Search City for weather",
			function(event) {
				event.preventDefault();
				let value = document.forms.searchRegionForm.elements.searchRegionName.value;
				let found = searchRegion(value);
				let tr = [];
				for (let i in found) {
					found[i].render();
					tr.push(found[i].tr);
				}
				let table = new RegionTable(tr, {id: "searchedRegions"});
				this.table = table;
				document.forms.searchRegionForm.appendChild(table.elem);
			});
	}
	render() {
		super.render();
	}
}