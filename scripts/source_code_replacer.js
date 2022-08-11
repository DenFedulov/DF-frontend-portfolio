'use strict';

class SourceCodeReplacer {

    constructor() {
        this.codePromise = this.replaceHTML("/views/code_sections.html", ".page_end");
        this.replaceHTML("/views/homeheader.html", ".page_start");
        this.placeHTMLSourceCode();
        this.addTaskTitle();

        try {
            this.consoleElem = document.querySelector('.console');
        } catch (e) { }
    }

    replaceHTML(path, target) {
        return new Promise((resolve, reject) => {
            try {
                const targetElem = document.querySelector(target);

                this.defaultXMLHttpRequest(path, function (xml) {
                    targetElem.outerHTML = xml.responseText;
                    resolve();
                })

            } catch (e) {
                console.error(e);
            }
        })
    }

    async placeHTMLSourceCode() {
        await this.codePromise;
        try {
            document.querySelector('.html_code').innerText = document.querySelector('.page').innerHTML;
        } catch (e) {
            console.error(e);
            document.querySelector('.html_code').innerText = "Error loading file: " + e;
        }
    }

    addTaskTitle() {

        let taskName = "Задача " + document.location.pathname.split('/').pop().match('.*(?=\\.)')[0];
        if (taskName.match(/\d+-\d+/)) {
            const head = document.querySelector('head');
            const page = document.querySelector('.page');

            const h1 = document.createElement('h1');
            const title = document.querySelector('title');
            h1.innerText = taskName;
            title.innerText = taskName;

            page.prepend(h1);
        }
    }

    toggleSection(className) { // Used in /views/code_sections.html 
        for (const i of document.getElementsByClassName(className)) {
            i.classList.toggle('off');
        }
    }

    showSection(className) {
        for (const i of document.getElementsByClassName(className)) {
            i.classList.remove('off');
        }
    }

    async replaceCodeSection(path, targetElem) {
        await this.codePromise;
        if (targetElem == "css_code") this.showSection("CSS_toggle");
        if (targetElem == "js_code") this.showSection("JavaScript_toggle");
        let target;
        try {
            if (path == 'path') throw new Error('Please specify file path for ' + targetElem);

            let fullPath = location.origin + path;
            target = document.getElementsByClassName(targetElem)[0];

            this.defaultXMLHttpRequest(fullPath, function (xml) {
                target.innerHTML = "<br>";
                target.innerText += xml.responseText;
            })

        } catch (e) {
            console.error(e);
            if (target) target.innerText = "Error loading file: " + e;
        };
    }

    defaultXMLHttpRequest(path, callback, async = true) {
        let xml = new XMLHttpRequest();

        xml.open('GET', path, async);
        xml.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                callback(this);
            }
        }

        xml.send();
    }

    wConsoleLog(...args) {
        let li = document.createElement('li');
        li.innerText = '▶ ';

        for (const value of args) {
            if (typeof value == 'object') {
                if (value instanceof Array) {
                    li.innerText += `Array(${value.length}) ${JSON.stringify(value)}  `
                } else {
                    li.innerText += `Object ${JSON.stringify(value)}  `
                }
            } else if (typeof value == 'string') {
                li.innerText += `'${value}'  `;
            } else {
                li.innerText += value + '  ';
            }
        }

        this.consoleElem.append(li);
    }
}

const sourceCodeReplacer = new SourceCodeReplacer();

async function replaceCodeSection(path, targetElem) { // Used inside html in <script> to choose which code section to place
    sourceCodeReplacer.replaceCodeSection(path, targetElem);
}

function wConsoleLog(...args) {
    console.log(...args);
    sourceCodeReplacer.wConsoleLog(...args);
}