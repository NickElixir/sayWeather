class Ol_Ul {
    constructor(type, elements, options, header) {
        this.type = type;
        this.elements = elements;
        this.options = options ? options : null;
        this.header = header ? header : null;
        this.render();
    }
    render() {
        if (this.type.toLowerCase() == "ol") {
            var list = document.createElement("ol");
        } else {
            var list = document.createElement("ul");
        }
        for (let i in this.elements) {
            list.appendChild(this.elements[i].elem ? this.elements[i].elem : this.elements[i]);
        }
        for (let i in this.options) {
            list.setAttribute(i, this.options[i]);
        }
        this.elem = list;
    }

}
class Li {
    constructor(innerHTML, options) {
        this.innerHTML = innerHTML;
        this.options = options ? options : null;
        this.render();
    }
    render() {
        let li = document.createElement("li");
        li.innerHTML = this.innerHTML;
        for (let i in this.options) {
            li.setAttribute(i, this.options[i]);
        }
        this.elem = li;
    }
}