themes = {
    "red": "f00",
    "orange": "f80",
    "yellow": "ff0",
    "nuclear": "8f0",
    "green": "0f0",
    "sea": "0f8",
    "cyan": "0ff",
    "blurple": "08f",
    "blue": "44f",
    "purple": "80f",
    "magenta": "f0f",
    "pink": "f08",
    "grey": "888",
    "white": "fff"
}

link_static = {
    "f": "ff",
    "8": "aa",
    "4": "99",
    "0": "88"
}

link_hover = {
    "f": "ff",
    "8": "cc",
    "4": "bb",
    "0": "aa"
}



text_caret = {
    "f": "99",
    "8": "95",
    "4": "93",
    "0": "91"
}

text_bg = {
    "f": "11",
    "8": "08",
    "4": "04",
    "0": "00"
}


spoil_border = {
    "f": "44",
    "8": "38",
    "4": "35",
    "0": "33"
}

spoil_bg = {
    "f": "33",
    "8": "28",
    "4": "25",
    "0": "22"
}


code_bg = {
    "f": "11",
    "8": "08",
    "4": "04",
    "0": "00"
}


bg = {
    "f": "22",
    "8": "18",
    "4": "15",
    "0": "11"
}

def sel(theme, block):
    return "#" + block[theme[0]] + block[theme[1]] + block[theme[2]]

for name in list(themes):
    theme = themes[name]
    open("priz-" + name + ".css", "w+").write(f"""\
@import url("/assets/css/priz-neon.css");

:root \x7b
    --link-color: {sel(theme, link_static)};
    --link-hover: {sel(theme, link_hover)};

    --textarea-bg: {sel(theme, text_bg)}22;
    --textarea-caret: {sel(theme, text_caret)};
    --textarea-border: #{theme}2;

    --theme: #{theme};

    --table-head-bg: #{theme}4;
    --table-caret: #{theme};
    --table-row-shade: #{theme}1;

    --spoil-border: {sel(theme, spoil_border)};
    --spoil-bg: {sel(theme, spoil_bg)};

    --code-border: #{theme}2;
    --code-bg: {sel(theme, code_bg)}66;

    --jumper-caret: #{theme};

    --bg: {sel(theme, bg)};
\x7d
""")
