function getText() {
    let input = null;
    let output = null;
    const io = [];

    const sections = $("#task-statement section");
    for (var i = 0; i < sections.length; i++) {
        const section = $(sections[i]);

        const h3 = section.find("h3");
        const pre = section.find("pre");

        if (h3.length == 0) {
            const prev = section.prev();
            if (prev.length > 0 && prev[0].tagName == "H3") {
                h3 = prev;
            }
        }

        if (h3.length > 0 && pre.length > 0 && $(h3[0]).is(":visible")) {
            const example = pre[0].textContent;
            const pretty = pre[0].getElementsByTagName("li");
            if (pretty.length > 0) {
                example = "";
                for (const p of pretty) {
                    example += p.textContent;
                    example += "\n";
                }
            }
            const header = h3[0].firstChild.textContent.trim();
            if (header.indexOf("入力例") == 0 || header.indexOf("Sample Input") == 0) {
                input = example.trim();
            } else if (header.indexOf("出力例") == 0 || header.indexOf("Sample Output") == 0) {
                output = example.trim();
            }
        }

        if (input != null && output != null) {
            io.push({ input: input, output: output });
            input = output = null;
        }
    }

    return io;
};

function sp(str) {
    const s = String(str).trim();
    if (s.includes(' ')) {
        return "[" + s.split(' ').map(x => {
            if (String(x).match(/^-?\d+$/)) {
                return x;
            }
            return "\x22" + x + "\x22";
        }) + "]" ;
    }
    if (s.match(/^-?\d+$/)) {
        return s;
    }
    return "\x22" + s + "\x22";
}

function createPyUnittest(io) {
    let text = '';
    for (const [i, t] of Object.entries(io)) {
        let inp_txt = t.input.trim().split("\n").map(x => sp(x));
        let out_txt = t.output.trim().split("\n").map(x => sp(x));
        text +=
            `    
    def test_${i}(self):
        ans = func(${inp_txt})
        res = ${out_txt}
        self.assertEqual(res, ans)
  `;
    }
    return text;
};
function saveToClipboard(str) {
    const textArea = document.createElement("textarea");
    document.body.appendChild(textArea);
    textArea.value = str;
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
}
const text = getText();
const unitTests = createPyUnittest(text);
saveToClipboard(unitTests);

