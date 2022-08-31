"use strict";

class SourceCodeReplacer {
  constructor() {
    let headerElems = this.createHeader();
    this.pageElem = this.createElementWithClass("div", "page");

    this.consoleElemBox = this.createConsole();
    this.consoleElem = this.consoleElemBox.querySelector(".console");

    let togglesElem = this.createCodeSectionToggles();
    let codeElem = this.createCodeSections();
    this.codeSectionLoadedPromise = new Promise((resolve, reject) => {
      window.onload = () => {
        let body = document.querySelector("body");
        this.htmlPre.innerText = this.getHTMLCode(body);

        this.moveBodyToElement(this.pageElem);
        body.prepend(...headerElems);
        body.append(
          this.createElementWithClass("div", "line"),
          this.consoleElemBox,
          togglesElem,
          codeElem
        );

        this.addTaskTitle();

        resolve();
      };
    });
  }

  addTaskTitle() {
    let taskName =
      "Задача " +
      document.location.pathname.split("/").pop().match(".*(?=\\.)")[0];
    if (taskName.match(/\d+-\d+/)) {
      const head = document.querySelector("head");

      const h1 = document.createElement("h1");
      const title = document.querySelector("title");
      h1.innerText = taskName;
      title.innerText = taskName;

      this.pageElem.prepend(h1);
    }
  }

  toggleSection(className) {
    for (const i of document.getElementsByClassName(className)) {
      i.classList.toggle("off");
    }
  }

  showSection(className) {
    for (const i of document.getElementsByClassName(className)) {
      i.classList.remove("off");
    }
  }

  async replaceCodeSection(path, targetElem) {
    await this.codeSectionLoadedPromise;

    if (targetElem == "css_code") this.showSection("CSS_toggle");
    if (targetElem == "js_code") this.showSection("JavaScript_toggle");
    let target;
    try {
      if (path == "path")
        throw new Error("Please specify file path for " + targetElem);

      let fullPath = location.origin + path;
      target = document.getElementsByClassName(targetElem)[0];

      this.defaultXMLHttpRequest(fullPath, function (xml) {
        target.innerHTML += path + ":<br>";
        target.innerText += xml.responseText;
        target.innerHTML += "<br><br>";
      });
    } catch (e) {
      console.error(e);
      if (target) target.innerText = "Error loading file: " + e;
    }
  }

  defaultXMLHttpRequest(path, callback, async = true) {
    let xml = new XMLHttpRequest();

    xml.open("GET", path, async);
    xml.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        callback(this);
      }
    };
    xml.send();
  }

  createElementWithClass(elementName, ...classNames) {
    let elem = document.createElement(elementName);
    elem.classList.add(...classNames);

    return elem;
  }

  createHeader() {
    let toTop = this.createElementWithClass("div", "to_top");
    let toTopLink = document.createElement("a");

    toTopLink.href = "#";
    toTopLink.innerHTML = "^ <br> To top";

    toTop.append(toTopLink);

    let homeHeader = this.createElementWithClass("div", "homeheader");
    let ul = document.createElement("ul");
    let li = document.createElement("li");
    let homeLink = document.createElement("a");

    homeLink.href = "/";
    homeLink.target = "_parent";
    homeLink.innerText = "Home";

    li.append(homeLink);
    ul.append(li);
    homeHeader.append(ul);

    return [toTop, homeHeader];
  }

  moveBodyToElement(elem) {
    let body = document.querySelector("body");
    let allBodyElems = document.querySelectorAll("body > *");

    for (const be of allBodyElems) {
      elem.append(be);
    }

    body.append(elem);
  }

  createConsole() {
    let consoleBoxElem = this.createElementWithClass(
      "div",
      "console_box",
      "off"
    );
    consoleBoxElem.innerText = "Console:";
    this.consoleElem = this.createElementWithClass("ul", "console");
    consoleBoxElem.append(this.consoleElem);

    return consoleBoxElem;
  }

  createCodeSectionToggles() {
    let sectionTogglesElem = this.createElementWithClass(
      "div",
      "section_toggles"
    );

    let htmlToggle = this.createElementWithClass("div", "HTML_toggle");
    htmlToggle.addEventListener("click", () =>
      this.toggleSection("HTML_toggle")
    );
    htmlToggle.title = "HTML toggle";
    htmlToggle.innerText = "HTML";

    let cssToggle = this.createElementWithClass("div", "CSS_toggle", "off");
    cssToggle.addEventListener("click", () => this.toggleSection("CSS_toggle"));
    cssToggle.title = "CSS toggle";
    cssToggle.innerText = "CSS";

    let jsToggle = this.createElementWithClass(
      "div",
      "JavaScript_toggle",
      "off"
    );
    jsToggle.addEventListener("click", () =>
      this.toggleSection("JavaScript_toggle")
    );
    jsToggle.title = "JavaScript toggle";
    jsToggle.innerText = "JavaScript";

    sectionTogglesElem.append(htmlToggle, cssToggle, jsToggle);

    return sectionTogglesElem;
  }

  createCodeSections() {
    let code = this.createElementWithClass("div", "code");

    let htmlSection = this.createElementWithClass(
      "div",
      "code_section",
      "HTML_toggle"
    );
    htmlSection.innerText = "HTML Source code:";
    let htmlCode = document.createElement("code");
    htmlSection.append(htmlCode);
    this.htmlPre = this.createElementWithClass("pre", "html_code");
    htmlCode.append(this.htmlPre);

    let cssSection = this.createElementWithClass(
      "div",
      "code_section",
      "CSS_toggle",
      "off"
    );
    cssSection.innerText = "CSS Source code (linked):";
    let cssCode = document.createElement("code");
    cssSection.append(cssCode);
    let cssPre = this.createElementWithClass("pre", "css_code");
    cssCode.append(cssPre);

    let jsSection = this.createElementWithClass(
      "div",
      "code_section",
      "JavaScript_toggle",
      "off"
    );
    jsSection.innerText = "JavaScript Source code (linked):";
    let jsCode = document.createElement("code");
    jsSection.append(jsCode);
    let jsPre = this.createElementWithClass("pre", "js_code");
    jsCode.append(jsPre);

    code.append(htmlSection, cssSection, jsSection);

    return code;
  }

  getHTMLCode(body) {
    let text = body.innerHTML;
    let liveCodeIndx = text.indexOf("<!-- Code injected");
    if (liveCodeIndx >= 0) {
      text = text.slice(0, liveCodeIndx);
    }

    text = location.pathname + ":" + text;

    return text;
  }

  async wConsoleLog(...args) {
    let li = document.createElement("li");
    li.innerText = "▶ ";

    this.consoleElemBox.classList.remove("off");

    for (const value of args) {
      if (typeof value == "object") {
        if (value instanceof Array) {
          li.innerText += `Array(${value.length}) ${JSON.stringify(value)}  `;
        } else {
          li.innerText += `Object ${JSON.stringify(value)}  `;
        }
      } else if (typeof value == "string") {
        li.innerText += `'${value}'  `;
      } else {
        li.innerText += value + "  ";
      }
    }

    await this.codeSectionLoadedPromise;

    this.consoleElem.append(li);
  }
}

const sourceCodeReplacer = new SourceCodeReplacer();

async function replaceCodeSection(path, targetElem) {
  // Used inside html in <script> to choose which code section to place
  sourceCodeReplacer.replaceCodeSection(path, targetElem);
}

function wConsoleLog(...args) {
  console.log(...args);
  sourceCodeReplacer.wConsoleLog(...args);
}
