function $(q, e = document) { return e.querySelector(q); }
function $$(q, e = document) { return e.querySelectorAll(q); }
function loadPage() {}

var is_IE = /(MSIE|Trident\/)/i.test(window.navigator.userAgent);
var is_Chrome = /Chrome\//.test(window.navigator.userAgent);
var is_Mobile = /(Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile)/i.test(window.navigator.userAgent);

// Flicker
function flickery_element(h) {
    h.classList.add("flicker")
    for(var x = 500; x <= 2000; x += Math.floor(Math.random() * 300) + 75)
        window.setTimeout((h) => h.classList.toggle("dim"), x, h);
    window.setTimeout((h) => h.classList.remove("flicker"), x + 5, h);
    window.setTimeout((h) => h.classList.add("dim"), x + 1, h);
    window.setTimeout((h) => h.classList.remove("dim"), x + 10, h);
}
function flickery() {
    flickery_element(this)
}
window.setInterval(() => flickery_element($("#head")), 15000);

// Scroll button
var shouldUpdate = true;

function jumpToEdge(delayed = 0) {
    window.navigator.vibrate([5]);
    window.setTimeout((e) => {globalThis.lastPosition = e}, 2000, window.scrollY);
    var to_top = $("#jumper").innerHTML == "[\u039b]";
    if(is_IE)
        window.scrollTo(0, to_top ? 0 : document.body.clientHeight);
    else
        window.scrollTo({top: to_top ? 0 : document.body.clientHeight, behavior: "smooth"});
    $("#jumper").innerHTML = to_top ? "[V]" : "[\u039b]";
    $("nav").classList.add("visible");
}

function resetUpdate() {
    shouldUpdate = true;
}

var lastPosition = 0;
function changeScrollingThingy(evt = null) {
    var y = window.scrollY;
    var max_y = document.body.clientHeight - window.innerHeight;
    if(evt?.deltaY)
        var dir_test = evt.deltaY < 0 && y > 32;
    else if(Math.round(y) != Math.round(lastPosition))
        var dir_test = y < lastPosition && y > 32;
    else
        return;
    var top_test = y >= max_y - 95;
    $("#jumper").innerHTML = (top_test || dir_test) ? "[\u039b]" : "[V]";
    $("nav").classList.toggle("visible", top_test || !dir_test);

    lastPosition = y;
    if(!shouldUpdate)
        return
    updateSpacer();
    shouldUpdate = false;
    window.setTimeout(resetUpdate, 500);
}


// Spacer
function updateSpacer(dontLoad = false) {
    if(!dontLoad)
        loadFooter();
    $("#spacer").style.height = "0px"; // Necessary for proper sizing
    $("#spacer").style.height = Math.max(window.innerHeight - document.body.clientHeight - 7, 0) + "px";
}



// Colors
function swapColor(c,s=!0){
    if(!$("link[rel='stylesheet']").href.includes("priz-" + c + ".css"))
        $("link[rel='stylesheet']").href = "/assets/css/priz-" + c +".css";
    $("#truelogo").src="/assets/image/webp/priz_" + c + ".webp";
}

// Load
function finish_load() {
    if($("#jumper")) {
        window.onwheel = (evt) => changeScrollingThingy(evt);
        window.ontouchmove = (evt) => changeScrollingThingy(evt);
    }
    window.onclick = changeFunnyTextThing;
    window.onauxclick = changeFunnyTextThing;
    changeFunnyTextThing();
    window.onresize = () => updateSpacer();
    for(var elem of $$("h1,h2,h3,h4,h5,h6")) {
        elem.onclick = (evt) => linkMe(evt.currentTarget);
        elem.onfocus = (evt) => flickery_element(evt.currentTarget);
        elem.setAttribute("tabindex", "0");
    }
    var h1 = $("h1#head");
    var fS = getComputedStyle(h1).fontSize

    if(fS == "48px")
        return

    h1.style.transition = "none"

    if(navigator.userAgent.includes("Android")) {
        var scales = {
            "38.4px": "60px",
            "43.2px": "54px",
            "52.8px": "47px",
            "62.4px": "40px",
            "72px": "34px",
            "81.6px": "30px",
            "96px": "26px"
        }
        if(scales[fS])
            h1.style.fontSize = scales[fS];
        fS = getComputedStyle(h1).fontSize;
    }
    var fN = Number(fS.slice(0, -2))
    if(fN < 48 || fN > 52) {
        n = Math.round(fS.slice(0, -2));
        while(Number(getComputedStyle(h1).fontSize.slice(0, -2)) < 48 && n < 100) {
            n += 1;
            h1.style.fontSize = n + "px";
        }
        while(Number(getComputedStyle(h1).fontSize.slice(0, -2)) > 52) {
            n -= 1;
            h1.style.fontSize = n + "px";
        }
    }
    h1.style.transition = "";
}

async function loadNow() {
    globalThis.texts = await load("/assets/text/footer.txt", {list: true});
    document.body.insertAdjacentHTML("beforeend", patreon_nav);
    var d = new Date();
    var day = d.getDate();
    switch(document.URL.split("#")[0].split("?")[0].endsWith("voxelprismatic.github.io/") ? d.getMonth() : -1) {
        case 0: // January
            swapColor("cyan");
            break;
        case 1: // February
            if(day == 14) {
                swapColor("pink");
                $("#truelogo").src = "/assets/image/webp/holi/priz_heart.webp";
                $("#head").innerHTML = "LOVE ;]";
            } else {
                swapColor("cyan");
            }
            break;
        case 2: // March
            swapColor("cyan");
            break;
        case 3: // April
            swapColor("cyan");
            break;
        case 4: // May
            swapColor("cyan");
            break;
        case 5: // June
            swapColor("cyan");
            break;
        case 6: // July
            swapColor("cyan");
            break;
        case 7: // August
            swapColor("cyan");
            break;
        case 8: // September
            swapColor("cyan");
            break;
        case 9: // October
            swapColor("orange");
            $("#truelogo").src = "/assets/image/webp/holi/priz_spook.webp";
            $("#head").innerHTML = "SPOOK ;]";
            break;
        case 10: // November
            swapColor("cyan");
            if(day == 11) {
                $("#truelogo").src = "/assets/image/webp/holi/priz_bday.webp";
                $("#head").innerHTML = "BDAY ;]";
            }
            break;
        case 11:
            // December -- Festive
            swapColor("cyan");
            $("#truelogo").src = "/assets/image/webp/holi/priz_xmas.webp";
            $("#head").innerHTML = "FESTIVE ;]";
            break;
        default:
            swapColor(theme);
    }
    finish_load();

    try {
        cited_sources;
    } catch(err) {
        var cited_sources = [];
    }
    for(var cite_number in cited_sources) {
        for(var elem of $$(`[data-cite="${cite_number}"]`)) {
            elem.href = cited_sources[cite_number];
            elem.setAttribute("target", "_blank");
        }
    }

    if(is_Chrome && Math.floor(Math.random() * 5) == 0)
        $("nav").outerHTML = firefox_nav;

    $("nav").classList.add("visible");
}

var patreon_nav = `
<nav class="sect">
    <span onclick="the_sads()">X</span>
    Consider donating via <a href="https://cash.app/$VoxelPrismatic" target="_blank">Cash App</a>!
</nav>`

var firefox_nav = `
<nav class="sect">
    <span title="Nope, I really want you to switch.\nChrome is actually a pain and doesn't follow any standards.\nHelp make my life easier by switching today.">&#x221a;</span>
    Consider switching to <a href='https://firefox.com/' target='_blank'>Firefox</a>!
</nav>`


// Start
async function load(filename, strip = false, json = false, list = false) {
    $("#head").innerHTML = filename.endsWith("error.html") ? "ERROR ;[" : document.title;
    console.log("Reading " + filename);
    list = strip.list ? true : list;
    json = strip.json ? true : json;
    var content = await (await fetch(filename)).text();
    if(json)
        return JSON.parse(content.trim().replace(/\\\n/gm, "\\n"));
    if(list)
        return content.trim().split(/\n/g);
    return strip ? content.trim() : content;
}

function loadFooter(...a) {}
function resizeDicts(...a) {}

function linkMe(elem) {
    elem.scrollIntoView({behavior: "smooth"});
    window.history.replaceState(window.history.state, document.title, "#" + elem.id);
    flickery_element(elem);
}


var texts = [];

function changeFunnyTextThing() {
    var options = texts.slice(0);
    options.splice(Math.max(texts.indexOf($("#funnytextthing").innerHTML), 0), 1);
    $("#funnytextthing").innerHTML = options[Math.floor(Math.random() * options.length)];
    updateSpacer();
}

function the_sads() {
    $("nav").classList.add("the-sads");
    $("nav").innerHTML = "awww ;[";
}

// A few things
for(var q of $$("input + label"))
    q.onclick = (evt) => evt.currentTarget.previousElementSibling.click();

for(var q of $$("spoil"))
    q.onclick = (evt) => evt.currentTarget.classList.toggle('unhide');

for(var img of $$("table img"))
    img.onclick = (evt) => window.open(evt.currentTarget.src, "_blank");
