class Table extends Element{
    constructor(elements, options) {
        super("table", options, elements);
        this.render();
    }
    render() {
        super.render();
    }
}
class Tbody extends Element{
    constructor(type, elements, options) {
		super(type, options, elements);
        this.render();
    }
    render() {
        super.render();
    }

}
class Th_Tr extends Element{
    constructor(type, elements, options) {
    	super(type, options);
		this.Elements = elements;
        this.render();
    }
    render() {
		super.render();
        for (let i in this.Elements) this.elem.appendChild(new Td(this.Elements[i].innerHTML, this.Elements[i].options).elem);
    }
}
class Td extends Element{
    constructor(innerHTML, options) {
		super("td", options);
        this.innerHTML = innerHTML;
        this.render();
    }
    render() {
		super.render();
        this.elem.innerHTML = this.innerHTML;
    }
}