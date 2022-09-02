function getText() {
    let name = null;
    let input = null;
    let output = null;
    let io = [];

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
            const header = h3[0].firstChild.textContent.trim();
            const example = pre[0].textContent;

            const pretty = pre[0].getElementsByTagName("li");
            if (pretty.length > 0) {
                example = "";
                for (var j = 0; j < pretty.length; j++) {
                    example += pretty[j].textContent;
                    example += "\n";
                }
            }

            if (header.indexOf("入力例") == 0 || header.indexOf("Sample Input") == 0) {
                name = header.replace(/\s+/g, "_");
                input = example;
            } else if (header.indexOf("出力例") == 0 || header.indexOf("Sample Output") == 0) {
                output = example;
            }
        }

        if (name != null && input != null && output != null) {
            io.push({ name: name, input: input, output: output });
            name = input = output = null;
        }
    }

    return io;
};

function createPyUnittest(io) {
    let text = '';
    for (var i = 0; i < io.length; i++) {
        let inp_txt = io[i].input.trim("\n").split("\n");
        let out_txt = io[i].output.trim("\n").split("\n");
        
        text +=
            `    
    def test_${io[i].name}(self):
        ans = func([${inp_txt}])
        res = [${out_txt}]
        self.assertEqual(res, ans)
  `;
    }
    return text;
};
function saveToClipboard(str) {
    var textArea = document.createElement("textarea");
    document.body.appendChild(textArea);
    textArea.value = str;
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
}
const text = getText();
const unitTests = createPyUnittest(text);
saveToClipboard(unitTests);

