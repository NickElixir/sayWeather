class Note {
    constructor(header, text) {
        this.header = header;
        this.text = text;
        this.render();
    }
    render() {
        let header = document.createElement("span");
        header.className = "note";
        header.innerHTML = this.header;
        let text = document.createElement("span");
        text.innerHTML = this.text;
        text.hidden = true;
        header.appendChild(document.createElement("br"));
        header.appendChild(text);
        header.addEventListener("click", function(event) {
        let target = event.target;
        while (target.className !== "note") {
            target = target.parentNode;
        }
        target.children[1].hidden = !target.children[1].hidden;
        });
        this.elem = header;
    }
}