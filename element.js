class Element{
    constructor(tag, options, elements) {
        this.tag = tag;
        if (options) this.options = options;
        if (elements) this.elements = elements;
        this.render();
    }
    render() {
        this.elem = document.createElement(this.tag);
        for (let i in this.options) this.elem.setAttribute(i, this.options[i]);
        for (let i in this.elements) this.elem.appendChild(this.elements[i].elem);
    }
}