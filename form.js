class Form {
    constructor(name, elements, legend, submitFunc, submitElem) {
        this.name = name;
        this.elements = elements;
        if (legend) {
            this.legend = legend;
        }
        if (submitFunc) {
            this.submitFunc = submitFunc;
        } else {
            alert("There is no submit function! Please add to this.submitFunc.");
        }
        if (submitElem) {
            this.submitElem = submitElem;
        } else {
            alert("Therу is no submit element! It will be made automatically.");
            this.submitElem = new Submit(this.name + "-submit", "Отправить");
        }
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
                let div = document.createElement("div");
                div.className = "textfield";
                let label = document.createElement("label");
                label.innerHTML = this.elements[i].header;
                div.appendChild(label);
                div.appendChild(this.elements[i].elem);
                form.appendChild(div);
            }
        }
        form.addEventListener("submit", this.submitFunc);
        this.submitElem.render();
        form.appendChild(this.submitElem.elem);

        this.elem = form;
    }
}
class Input {
    constructor(name, header, options, parent) {
        this.name = name;
        if (!this.type) {
            this.type = "text";
        }
        this.header = header;
        if (options) {
            this.options = options;
        }
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
        input.value = this.value;
        p.appendChild(input);
        p.appendChild(document.createTextNode(this.header));
        p.addEventListener("click", focusRadioParagraph);
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