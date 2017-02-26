class Form {
    constructor(name, elements, legend, submitFunc, submitElem) {
        this.name = name;
        this.elements = elements;
        this.legend = legend ? legend : null;
        this.submitFunc = submitFunc ? submitFunc : null;
            //If there is no submit function, please add to this.submitFunc.
            this.submitElem = submitElem ? submitElem : new Submit(this.name + "-submit", "SUBMIT");
            //If there is no submit element, it will be made automatically.
        this.render();
    }
    render() {
        let form = document.createElement("form");
        form.name = this.name;
        if (this.legend) {
            let legend = document.createElement("legend");
            legend.innerHTML = this.legend;
            form.appendChild(legend);
        }
        for (let i in this.elements) {
            if (this.elements[i] instanceof Note) {
                form.appendChild(this.elements[i].elem);
            } else {
                if (this.elements[i] instanceof Checkbox) {
                    var div = document.createElement("p");
                    div.className = "checkbox";
                    div.innerHTML = this.elements[i].header;
                    div.addEventListener("click", function(){
                        if (event.target.tagName == "P") {
                            event.target.children[0].checked = !event.target.children[0].checked;
                        }
                    });
                } else {
                    var div = document.createElement("div");
                    let label = document.createElement("label");
                    label.innerHTML = this.elements[i].header;
                    div.appendChild(label);
                }
                div.appendChild(this.elements[i].elem);
                form.appendChild(div);
            }
        }
        form.addEventListener("submit", this.submitFunc);
        this.submitElem.render();
        form.appendChild(this.submitElem.elem);

        this.elem = form;
    }
    static createSearchRegion() {
		return new Form("searchRegionForm",
			[new Search("searchRegionName", "City")], 
			"Search City for weather",
			function(event) {
				event.preventDefault();
				let value = document.forms.searchRegionForm.elements.searchRegionName.value;
				if (value) {
					let request = new XMLHttpRequest();
					request.open("GET", "http://api.openweathermap.org/data/2.5/find?type=like&appid=" + sayWeatherUserData.weatherApiKey + "&q=" + value, true);
					request.send();
                    document.body.querySelector(".cssload-wrapper").classList.toggle("invisible");
					request.timeout = 10000;
					request.ontimeout = function() {
						alert("No answer from server too long. Try again or check settings");
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
								let tr = [];
								for (let i in cities) {
									cities[i].render();
									tr.push(cities[i].tr);
								}
								let table = new RegionTable(tr, {id: "searchedRegions", cellspacing: 0});
								this.table = table;
								table = document.body.querySelector("#searchedRegions");
								if (table) document.forms.searchRegionForm.removeChild(table);
								document.forms.searchRegionForm.appendChild(this.table.elem);
                                document.body.querySelector(".cssload-wrapper").classList.toggle("invisible");
							} else {
                                document.body.querySelector(".cssload-wrapper").classList.toggle("invisible");
                                alert("Sorry, this city is not found.");
							}
						} else {
                            document.body.querySelector(".cssload-wrapper").classList.toggle("invisible");
                            if (request.status == 0) {
                                alert("No Internet Connection. Please check settings.")
                            } else {
                                alert("Error: " + request.status + ' : ' + request.statusText);
                            }
						}
					}
				}
		});
	}
    static speechTimer() {
        return new Form("speechTimer", [new Num("hours", "hours", {min: 0, max: 23, step: 1}), new Num("minutes", "minutes", {min: 0, max: 59, step: 1})], "speech timer", function(event){
            event.preventDefault();
            let hours = document.forms.speechTimer.hours.value;
            let minutes = document.forms.speechTimer.minutes.value;
            let indent = new Date().getTime() % 86400000 - new Date().getTimezoneOffset() * 60000;
            let milleseconds = (hours * 3600 + minutes * 60) * 1000;
            let difference = milleseconds - indent;
            if (difference < 0) difference = 86400000 + difference;
            let timer = new SpeechTimer(false, {indent: difference}, new currentWeather("id", sayWeatherUserData.regionId, sayWeatherUserData.weatherUnits).toString());
            timer.start();
            timer.pushToTimers();
        });
    }
    static speechLoopTimer() {
        return new Form("speechLoopTimer", [new Num("hours", "hours", {min: 0, max: 23, step: 1}), new Num("minutes", "minutes", {min: 0, max: 59, step: 1}), new Checkbox("mon", "mon"), new Checkbox("tue", "tue"), new Checkbox("wen", "wen"), new Checkbox("thu", "thu"), new Checkbox("fri", "fri"), new Checkbox("sat", "sat"), new Checkbox("sun", "sun")], "weather speech interval timer", function(event){
            event.preventDefault();
            let hours = document.forms.speechLoopTimer.hours.value;
            let minutes = document.forms.speechLoopTimer.minutes.value;
            let milleseconds = (hours * 3600 + minutes * 60) * 1000;
            let week = document.forms.speechLoopTimer.querySelectorAll("input[type=checkbox]");
            let booleanWeek = [];
            for (let i = 0; i < week.length; i++) booleanWeek[i] = week[i].checked;
            for (let i in booleanWeek) {
                if (booleanWeek[i]) 
                {
                    let timer = new SpeechTimer(true, {indent: i * 84600000 + milleseconds, interval: 7 * 86400000},  new currentWeather("id", sayWeatherUserData.regionId, sayWeatherUserData.weatherUnits).toString());
                    timer.start();
                    timer.pushToTimers();
                }
            }
        });
    }
}
class Input {
    constructor(name, header, options, parent) {
        this.name = name;
        if (!this.type) {
            this.type = "text";
        }
        this.header = header;
        this.options = options ? options : null;
        if (!parent) {
            this.render();
        }
    }
    render() {
        let input = document.createElement("input");
        input.name = this.name;
        input.type = this.type;
        if (this.options) {
            for (let i in this.options) {
                input.setAttribute(i, this.options[i]);
            }
        }
        this.elem = input;
    }
}
class Num extends Input {
    constructor(name, header, options) {
        super(name, header, options, true);
        this.type = "number";
        this.render();
    }
    render() {
        super.render();
    }
}
class Checkbox extends Input {
    constructor(name, header, options) {
        super(name, header, options, true);
        this.type = "checkbox";
        this.render();
    }
    render() {
        super.render();
    }
}
class Radio extends Input {
    constructor(name, text, options) {
        super(name, text, options, true);
        this.type = "radio";
        this.render();
    }
    render() {
        let p = document.createElement("p");
        p.className = "radio";
        super.render();
        let input = this.elem;
        input.type = this.type;
        if(this.options) {
            for (let i in this.options) {
                input.setAttribute(i, this.options[i]);
            } 
        }
        p.appendChild(input);
        p.appendChild(document.createTextNode(this.header));
        p.addEventListener("click", function(event) {
            if (event.target.tagName == "P") {
                event.target.children[0].checked = true;
            }
        });
        this.elem = p;
    }
}
class RadioList {
    constructor(header, elements) {
        this.elements = elements;
        this.header = header;
        this.render();
    }
    render() {
        let div = document.createElement("div");
        for (let i in this.elements) {
            let radio = new Radio(this.elements[i].name, this.elements[i].header, {value : this.elements[i].value});
            radio.render();
            div.appendChild(radio.elem);
        }
        this.elem = div;
    }
}
class Submit extends Input {
    constructor(name, header, options) {
        super(name, header, options, true);
        this.type = "submit";
        this.render();
    }
    render() {
        super.render();
        this.elem.value = this.header;
    }
}
class Select {
    constructor(name, Options, header) {
        this.name = name;
        this.Options = Options;
        this.header = header;
        this.render();
    }
    render() {
        let select = document.createElement("select");
        select.name = this.name;
        this.renderOptions();
        for (let i in this.renderedOptions) {
            select.appendChild(this.renderedOptions[i]);
        }
        this.elem = select;
    }
    renderOptions() {
        let options = [];
        for (let i in this.Options) {
            let option = new Option(this.Options[i].text, this.Options[i].value);
            options.push(option);
        }
        this.renderedOptions = options;
    }
}
class Search extends Input {
    constructor(name, header, options) {
        super(name, header, options, true);
        this.type = "search";
        this.render();
    }
    render() {
        super.render();
    }
}