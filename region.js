class Region {
    constructor(name, id, lat, lon, country) {
        this.name = name;
        this.id = id;
		this.lat = lat;
		this.lon = lon;
        this.country = country;
    }
	render() {
		let tr = new Th_Tr("tr", [{innerHTML: this.name}, {innerHTML: this.lat + String.fromCharCode(176)}, {innerHTML: this.lon + String.fromCharCode(176)}, {innerHTML: this.country}], {regionId: this.id});
		this.tr = tr;
	}
};
class RegionTable extends Table { //no headers
	constructor(tr, options) {
		super(tr, options);
	}
	render() {
		super.render();
		this.elem.addEventListener("click", function(event) {
			let target = event.target;
			target = target.closest("tr");
			if (target) {
				let last = document.body.querySelector("#searchedRegions .selected");
				if (last) last.classList.toggle("selected");
				target.className = "selected";
				sayWeatherUserData.regionId = target.getAttribute("regionId");
				localStorage.sayWeatherUserData = JSON.stringify(sayWeatherUserData);
			}
		});
	}
};