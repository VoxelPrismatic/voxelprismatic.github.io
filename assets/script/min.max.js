function $(q, e = document) { return e.querySelector(q); }
function $$(q, e = document) { return e.querySelectorAll(q); }
function loadPage() {}

// delay.js
function delayFunction(n,t,e,r,...o){for(var c=[],u=t;u<e;u+=r)c.push(window.setTimeout(n,u,...o));return c}function delaySwapColor(n,...t){try{return delayFunction(swapColor,0,3e3,100,n,...t)}catch(n){return[]}}function delaySetTransitions(){try{return delayFunction(setTransitions,1e3,4e3,100)}catch(n){return[]}}function delayUpdateSpacer(){try{return delayFunction(updateSpacer,0,100,25)}catch(n){return[]}}function delayResizeDicts(){try{return delayFunction(resizeDicts,0,100,25,!1)}catch(n){return[]}}function stopDelay(n){if(null!=n)for(var t of n)window.clearTimeout(t)}function logFunc(n,...t){if(null!=n)try{n(...t)}catch(n){console.error(n)}}

// accessibility.js
function doNothing(...o){}function allowKeyboard(o,e=doNothing){o.tabIndex="0",o.onkeyup=function(o){addFocus(o,this)},e(o)}function allowKeyboardBulk(o,e=doNothing){for(var t of $$(o))try{allowKeyboard(t,e)}catch(o){console.error(o)}}function a11y(){for(var o of(allowKeyboard("h1, h2, h3, h4, h5, h6",function(o){o.onfocus=flickery}),allowKeyboard("a, img, .lnk, button, .collapser, .dropper"),$$("span")))try{o.className.match(/(hide|dropper)/gm)?allowKeyboard(o):o.tabIndex="-1"}catch(o){console.error(o)}for(var o of $$("#head, #truelogo .dropper"))o.tabIndex="-1",o.onkeyup=null}var focus_timeout=!1,focusing=0;function addFocus(o,e){if(console.log(o,e),!focus_timeout){for(var t of(focus_timeout=!0,window.setTimeout(function(){focus_timeout=!1},100),focusing+=1,$$(".focusing")))t.classList.remove("focusing");try{e.classList.add("focusing"),window.setTimeout(removeFocus,5e3,e),("Enter"==o.key||e.nodeName.startsWith("H")&&"Tab"==o.key)&&e.click()}catch(o){}}}function removeFocus(o){if(!(focusing-=1))try{o.classList.remove("focusing")}catch(o){console.log(o)}}

// aesthetic/flicker.js
function flickery_element(n){n==$("h1#head")&&n.clientHeight>54&&(console.log(n.clientHeight),console.log(n),n.style.setProperty("top",-n.clientHeight/2-54+"px","important")),delayFunction(function(n){n.style.transition="none"},1e3,1001,1e3,n);var t=!0,e=compSty(n).color;e="rgba("+e.split("(")[1].slice(0,-1)+", 0.7)";for(var o=1e3;o<=3e3;o+=Math.floor(200*Math.random())+25)(t=!t)?delayFunction(function(n){n.style.color=""},o,o+1,o,n):delayFunction(function(n){n.style.color=e},o,o+1,o,n);delayFunction(function(n){n.style.transition=""},o-25,o,5,n),delayFunction(function(n){n.style.color=e},o-50,o-49,o,n),delayFunction(function(n){n.style.color=""},o,o+1,o,n)}function flickery(){flickery_element(this)}window.setInterval(function(){flickery_element($("#head"))},15e3);

// aesthetic/dynamic.js
var is_IE=/(MSIE|Trident|OS ?X|macOS|iOS|iPadOS|iPad|iPod|iPhone|Safari)/i.test(window.navigator.userAgent),is_Chrome=/Chrome\//.test(window.navigator.userAgent);function jumpToEdge(e=0){window.navigator.vibrate([5]),window.setTimeout(e=>{globalThis.lastPosition=e},2e3,window.scrollY),"[Λ]"==$("#jumper").innerHTML?(is_IE?window.scrollTo(0,0):window.scrollTo({top:0,behavior:"smooth"}),$("#jumper").innerHTML="[V]"):(is_IE?window.scrollTo(0,document.body.scrollHeight):is_Chrome?$("#footer").scrollIntoView({block:"start",inline:"end",behavior:"smooth"}):window.scrollTo({top:document.body.scrollHeight,behavior:"smooth"}),$("#jumper").innerHTML="[Λ]")}function resetUpdate(){shouldUpdate=!0}function changeScrollingThingy(e=null){var o=$("#jumper");if(null==e||null==e.deltaY){if(window.scrollY%2)return;window.scrollY/document.body.scrollHeight>=.5?(o.innerHTML="[Λ]",$("#nav").classList.remove("visible")):(o.innerHTML="[V]",$("nav").classList.add("visible"))}else{var t=window.scrollY;o=$("#jumper");t>=document.body.scrollHeight-95?(o.innerHTML="[Λ]",$("nav").classList.add("visible")):e.deltaY>0||t<=32?(o.innerHTML="[V]",$("nav").classList.add("visible")):(o.innerHTML="[Λ]",$("nav").classList.remove("visible"))}shouldUpdate&&(updateSpacer(),shouldUpdate=!1,window.setTimeout(resetUpdate,500))}function getHeight(e){let o=compSty(e);var t=Number(o.height.slice(0,-2));return t+=Number(o.marginTop.slice(0,-2)),t+=Number(o.marginBottom.slice(0,-2))}function updateSpacer(e=!1){e||loadFooter(),spacer=$("#spacer"),spacer.style.transition="none",spacer.style.height="0px";for(var o=window.innerHeight,t=0;Number(compSty("body").height.slice(0,-2))+7<o;)spacer.style.height=t+"px",t+=1}shouldUpdate=!0;var sub_styles_timeout=!1;function sub_styles(e=!0){globalThis.sub_styles_timeout||(globalThis.sub_styles_timeout=!0,console.groupCollapsed("Reformatting page"),e&&$("#spacer")&&(console.log("Resizing spacer"),logFunc(updateSpacer)),e&&$("table")&&(console.log("Styling tables"),logFunc(styleTables)),e&&$(".accent")&&(console.log("Moving accents"),logFunc(style_accents)),$("dict")&&logFunc(resizeDicts),$("#spacer")&&(console.log("Resizing spacer"),logFunc(updateSpacer)),console.groupEnd("Reformatting page"),window.setTimeout(()=>globalThis.sub_styles_timeout=!1,100))}

// aesthetic/colors.js
function swapColor(c,s=!0){$("link[rel='stylesheet']").href="/assets/css/priz-"+c+".css";$("#truelogo").src="/assets/image/webp/priz_"+c+".webp";try{resizeDicts(!1)}catch(e){}try{setTransitions(!1)}catch(e){}window.setTimeout(resizeDicts(!1),100)}

// load-min.js
var lastPosition = 0;
var is_Mobile = /(Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile)/i.test(window.navigator.userAgent);
function checkScrollPosition() {
    var y = window.scrollY;
    if(y == lastPosition)
        return;
    var elem = $("#jumper");
    if(y >= document.body.scrollHeight - 95) {
        elem.innerHTML = "[\u039b]";
        $("nav").classList.add("visible");
    } else if(y > lastPosition || y <= 32) {
        elem.innerHTML = "[V]";
        $("nav").classList.add("visible");
    } else {
        elem.innerHTML = "[\u039b]";
        $("nav").classList.remove("visible");
    }
    lastPosition = y;
}
function finish_load() {
    if($("#jumper")) {
        if(is_Mobile)
            window.setInterval(checkScrollPosition, 100);
        window.onwheel = (evt) => changeScrollingThingy(evt);
        window.ontouchmove = changeScrollingThingy;
    }
    window.onclick = changeFunnyTextThing;
    window.onauxclick = changeFunnyTextThing;
    changeFunnyTextThing();
    window.onresize = () => sub_styles(false);
    for(var elem of $$("h1,h2,h3,h4,h5,h6")) {
        elem.onclick = (evt) => linkMe(evt.currentTarget);
        elem.onfocus = (evt) => flickery_element(evt.currentTarget);
    }
    var h1 = $("h1#head");
    var fS = getComputedStyle(h1).fontSize

    if(fS == "48px")
        return a11y();

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
    a11y();
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
}

var patreon_nav = `
<nav class="sect">
    <span onclick="the_sads()">X</span>
    Consider donating via <a href="https://cash.app/$VoxelPrismatic" target="_blank">Cash App</a>!
</nav>`

async function load(e,n=!1,t=!1,a=!1){e.endsWith("error.html")?$("#head").innerHTML="ERROR ;[":$("#head").innerHTML=document.title,console.log("Reading "+e),n.list&&(a=!0),n.json&&(t=!0);var i=await fetch(e),r=await i.text();return(n||a||t)&&(r=r.trim()),t?JSON.parse(r.replace(/\\\n/gm,"\\n")):a?r.split("\n"):r}function loadFooter(){}function linkMe(t){t.scrollIntoView({behavior:"smooth"});var e=t.id;"#"!=e[0]&&(e="#"+e),window.history.replaceState(window.history.state,document.title,e),flickery_element(t)}function flickery_element(t){delayFunction(function(t){t.style.transition="none"},1e3,1001,1e3,t);var e=!0,n=compSty(t).color;n="rgba("+n.split("(")[1].slice(0,-1)+", 0.7)";for(var i=1500;i<=3e3;i+=Math.floor(200*Math.random())+25)(e=!e)?delayFunction(function(t){t.style.color=""},i,i+1,i,t):delayFunction(function(t){t.style.color=n},i,i+1,i,t);delayFunction(function(t){t.style.transition=""},i-25,i,5,t),delayFunction(function(t){t.style.color=n},i-50,i-49,i,t),delayFunction(function(t){t.style.color=""},i,i+1,i,t)}function resizeDicts(t=!0,e=document){if(!(window.innerHeight+""+window.innerWidth).includes(".")){var n=compSty("h1").height.slice(0,-2)/2;t&&(console.log("Window resized to "+window.innerWidth+"x"+window.innerHeight),console.log("Resizing elements"));var i=!1,o=2*n+20+"px",l=n+6+"px",r=n+"px";for(var s of $$("dict",e)){var c=s.parentElement;if(0!=c.clientWidth){var a=c.clientWidth-5,d=s.style;a-=s.nextElementSibling.clientWidth,a-=s.previousElementSibling.clientWidth,d.lineHeight=r,s.classList.remove("smol-dict"),a<100&&(i=!0),s.parentElement.style.minHeight=n+"px",s.parentElement.style.height=n+"px";var h=dictsPerfect}}if(i){for(var s of $$("dict"))s.classList.add("smol-dict"),s.style.top=l,s.parentElement.style.minHeight=o,s.parentElement.style.height=o;h=dictsTooSmol}delayFunction(h,0,1e3,500),updateSpacer()}}function dictsPerfect(){for(var t of $$("dict")){var e=t.parentElement;e.classList.add("dict-good"),e.classList.remove("dict-smol"),t.style.top=""}}function dictsTooSmol(){for(var t of $$("dict")){var e=t.parentElement;e.classList.add("dict-smol"),e.classList.remove("dict-good"),t.style.top=Number(t.style.lineHeight.slice(0,-2))+5+"px"}}function toggleDrop(t){t.classList.toggle("h-dropper-closed")?t.innerHTML="[V]":t.innerHTML="[Λ]",target=t.nextElementSibling,target||(target=t.parentElement.nextElementSibling),target.classList.toggle("invis"),resizeDicts(!1,target),t.scrollIntoView({behavior:"smooth"}),lastPosition=document.body.scrollHeight+10}var texts=[];function changeFunnyTextThing(){for(var t=texts[Math.floor(Math.random()*texts.length)];""==t||t==$("#funnytextthing").innerHTML;)t=texts[Math.floor(Math.random()*texts.length)];$("#funnytextthing").innerHTML=t,delayUpdateSpacer()}function compSty(t){try{return window.getComputedStyle(t)}catch(e){return window.getComputedStyle($$(t)[0])}}function the_sads(){var e=$("nav");var s=e.style;e.innerHTML="awww ;[";s.opacity="0";s.bottom="-16px"}

for(var q of $$("input + label")){q.onclick=(evt)=>evt.currentTarget.previousElementSibling.click()}
for(var q of $$("spoil")){q.onclick=(evt)=>evt.currentTarget.classList.toggle('unhide')}
