class Header {
    constructor(elements, options) {
        this.elements = elements;
        this.options = options ? options : null;
        this.render();
    }
    render() {
        let header = document.createElement("header");
        for (let i in this.elements) {
            header.appendChild(this.elements[i].elem ? this.elements[i].elem : this.elements[i]);
        }
        for (i in this.options) {
            header.setAttribute(i, this.options[i]);
        }
        this.elem = header;
    }
}