var pics = [];

function get_pic() {
    for(var img of $$("img[data-src]"))
        pics.push(img);
    pics.reverse();
}

function next_pic() {
    if(!pic_src.length) {
        console.timeEnd("Loading - Medium pics");
        return console.groupEnd("Medium img URLs");
    }

    var img = pics.pop();
    img.onload = (evt) => {
        evt.currentTarget.className = "loaded";
        evt.currentTarget.onclick = (evt) => img_zoom(evt.currentTarget);
        evt.currentTarget.onload = (evt) => evt.currentTarget.classList.remove("blur");
        next_pic();
    };
    img.className = "blur";
    img.src = img.datatset.src + "-med.webp";
    console.log(img.src);
}

function smol_pic() {
    if(pics.length) {
        var img = pics.pop();
        img.onload = () => { smol_pic() };
        img.src = img.datatset.src + "-smol.webp";
        return console.log(img.src)
    }

    console.timeEnd("Loading - Small pics");
    console.groupEnd("Small img URLs");
    get_pic();
    console.time("Loading - Medium pics");
    console.groupCollapsed("Medium img URLs");
    next_pic();
}

function no_zoom(img) {
    if(img)
        var ls = $$(`img.clicked:not([data-src="${img.dataset.src}"])`);
    else
        var ls = $$('img.clicked');

    for(var i of ls) {
        i.classList.remove("clicked");
        i.style.transform = "";
        i.src = i.dataset.src + "-med.webp";
        i.classList.remove("blur");
    }
}

function fix_scale(img) {
    var n = img.dataset.scale;
    img.src = img.dataset.src + "-med.webp"
    if(!n) {
        var iW = innerWidth * 0.9, iH = innerHeight * 0.9;
        var w = img.width, h = img.height;
        var n = (h > iH) ? -2 : 0
        while((w * n < iW) && (h * n < iH))
            n += 0.1
        img.dataset.scale = n;
    }
    img.style.transform = "scale(" + n + ")";
    img.classList.add("blur");
    window.setTimeout((img) => img.src = img.dataset.src, 750, img);
}

function img_zoom(img) {
    if(!img.className.includes("loaded"))
        return;

    img.style.setProperty("--top", - $("nav").clientHeight + "px");

    if(img.classList.toggle("clicked")) {
        no_zoom(img);
        img.classList.add("blur");
        img.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center"
        })

        fix_scale(img);
    } else {
        img.style.transform = "";
        img.src = img.dataset.src + "-med.webp";
        img.classList.remove("blur");
    }
}

get_pic();
console.time("Loading - B/W small pics");
console.groupCollapsed("Small img URLs");
smol_pic();
window.addEventListener("click", (evt) => {
    if(evt.target.nodeName != "IMG")
        no_zoom();
});
var fix_scale_timeout = 0;
window.addEventListener("resize", () => {
    for(var i of $$("img[data-scale]"))
        i.removeAttribute("data-scale");
    window.clearTimeout(fix_scale_timeout);
    fix_scale_timeout = window.setTimeout(() => fix_scale($('.clicked')), 100);
})

window.setInterval(() => $(".blur")?.classList.toggle("bw"), 750);
