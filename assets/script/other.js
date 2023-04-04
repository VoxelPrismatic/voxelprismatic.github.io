var url = document.URL.split("#")[0];
var linkContent = "Home page";
var linkHref = "/";
var linkTarget = "";
if(url.endsWith("voxelprismatic.github.io/")) {
    linkHref = "/map";
    linkContent = "Site map";
    linkTarget = "";
}

if(url.endsWith("/map") || url.endsWith("/map.html")) {
    linkHref = "https://github.com/voxelprismatic/";
    linkContent = "Website repo";
    linkTarget = "_blank";
}


var footTag = {
    "tag": "div",
    "style": "text-align: center;",
    "<0>": {
        "tag": "div",
        "style": "height: 0px;",
        "id": "spacer"
    },
    "<1>": {
        "tag": "sub",
        "style": "text-align: center !important;",
        "id": "footer",
        "br0": 2,
        "<0>": {
            "tag": "b",
            "style": "font-size: larger;",
            "#": "BY PRIZ WITH WINKY BRACKET FACE ;]"
        },
        "br1": 1,
        "<1>": {
            "tag": "span",
            "id": "links_and_sources",
            "<1>": {
                "tag": "a",
                "href": linkHref,
                "#": linkContent,
                "target": linkTarget
            }
        },
        "br2": 1,
        "<2>": {
            "tag": "span",
            "id": "copyright",
            "#": "© PRIZ ;] 2021"
        },
        "br3": 1,
        "<3>": {
            "tag": "span",
            "id": "funnytextthing"
        },
        "br4": 2
    }
}

var footer = tag(footTag);

var texts = [];

function changeFunnyTextThing() {
    var theText = texts[Math.floor(Math.random() * texts.length)];
    while(theText == "" || theText == $("#funnytextthing").innerHTML)
        theText = texts[Math.floor(Math.random() * texts.length)];
    $("#funnytextthing").innerHTML = theText;
    delayUpdateSpacer();
}

function compSty(elem) {
    try {
        return window.getComputedStyle(elem);
    } catch(err) {
        return window.getComputedStyle($$(elem)[0]);
    }
}
