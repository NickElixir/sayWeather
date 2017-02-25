class Table {
    constructor(elements, options) {
        this.elements = elements;
        this.options = options ? options : null;
        this.render();
    }
    render() {
        let table = document.createElement("table");
        if (this.options) {
            for (let i in this.options) {
                table.setAttribute(i, this.options[i]);
            }
        }
        for (let i in this.elements) {
            table.appendChild(this.elements[i].elem);
        }
        this.elem = table;
    }
}
class Tbody {
    constructor(type, elements, options) {
        this.type = type;
        this.elements = elements;
        this.options = options ? options : null;
        this.render();
    }
    render() {
        if (this.type = "thead") {
            var elem = document.createElement("thead");
        } else {
            var elem = document.createElement("tbody");
        }
        if (this.options) {
            for (let i in this.options) {
                elem.setAttribute(i, this.elements[i]);
            }
        }
        for (let i in this.elements) {
            elem.appendChild(this.elements[i].elem);
        }
        this.elem = elem;
    }

}
class Th_Tr {
    constructor(type, elements, options) {
        this.type = type;
        this.elements = elements;
        this.options = options ? options : null;
        this.render();
    }
    render() {
        if (this.type.toLowerCase() =="th") {
            var elem = document.createElement("th");
        } else {
            var elem = document.createElement("tr");
        }
        if (this.options) {
            for (let i in this.options) {
                elem.setAttribute(i, this.options[i]);
            }
        }
        for (let i in this.elements) {
            elem.appendChild(new Td(this.elements[i].innerHTML, this.elements[i].options).elem);
        }
        this.elem = elem;
    }
}
class Td {
    constructor(innerHTML, options) {
        this.innerHTML = innerHTML;
        this.options = options ? options : null;
        this.render();
    }
    render() {
        let td = document.createElement("td");
        td.innerHTML = this.innerHTML;
        if (this.options) {
            for (let i in this.options) {
                td.setAttribute(i, this.options[i]);
            }
        }
        this.elem = td;
    }
}