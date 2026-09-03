from pathlib import Path

root = Path(r"c:\Users\L.J\Desktop\sces socialesproject\ALLPAGES\Pages")
css = """
body {
    background-image: url('../Images/scola-wave-background-dark.svg');
    background-size: cover;
    background-position: center bottom;
    background-repeat: no-repeat;
    background-attachment: fixed;
    min-height: 100vh;
}
"""

updated = []
for path in sorted(root.rglob("*.html")):
    text = path.read_text(encoding="utf-8")
    text = text.replace("scola-wave-background.svg", "scola-wave-background-dark.svg")

    if "<style" in text and "</style>" in text:
        if "scola-wave-background-dark.svg" not in text:
            text = text.replace("</style>", f"\n{css}</style>", 1)
    elif "</head>" in text:
        text = text.replace("</head>", f"\n<style>{css}</style>\n</head>", 1)
    else:
        text += f"\n<style>{css}</style>"

    path.write_text(text, encoding="utf-8")
    updated.append(path.name)

print(f"Updated {len(updated)} HTML pages with the SVG background.")
print("Updated pages:", ", ".join(updated[:10]))
