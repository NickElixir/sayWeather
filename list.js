class Ol_Ul extends Element{
    constructor(type, elements, options, header) {
        super(type, options, elements);
        this.header = header ? header : null;
        this.render();
    }
    render() {
        super.render();
    }

}
class Li extends Element{
    constructor(innerHTML, options) {
        super("li", options);
        this.innerHTML = innerHTML;
        this.render();
    }
    render() {
        super.render();
        this.elem.innerHTML = this.innerHTML;
    }
}