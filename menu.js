function selectSection(event) {
    if (document.body.querySelector(".visible")) {
    document.body.querySelector(".visible").className = "invisible";
    document.body.querySelector("#" + event.target.getAttribute("key")).className = "visible";
        if (document.body.clientWidth < 768) {
            document.querySelector("body").classList.toggle("navOpen");
            document.querySelector("nav").classList.toggle("open");
            document.querySelector(".container").classList.toggle("open");
            document.querySelector(".openNav").classList.toggle("open");
        }
    }
}
class Menu extends Ol_Ul {
    constructor(elements, options, header) {
        super("ul", elements, options, header);
    }
    render() {
        super.render();
        let section = document.createElement("section");
        section.className = "menu";
        let nav = document.createElement("nav");
        this.listElem = this.elem;
        let points = this.listElem.querySelectorAll("li");
        for (let i = 0; i < points.length; i++) {
            points[i].addEventListener("click", selectSection);
        }
        nav.appendChild(this.listElem);
        section.appendChild(nav);
        let openNav = document.createElement("div");
        openNav.className = "openNav";
        openNav.addEventListener("click", function(){
            document.querySelector("body").classList.toggle("navOpen");
            document.querySelector("nav").classList.toggle("open");
            document.querySelector(".container").classList.toggle("open");
            openNav.classList.toggle("open");
        });
        let icon = document.createElement("div");
        icon.className = "icon";
        openNav.appendChild(icon);
        section.appendChild(openNav);
        this.elem = section;
    }
}