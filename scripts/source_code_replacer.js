'use strict';

const headerPromise = replaceHTML("/views/homeheader.html", ".page_start");
const codePromise = replaceHTML("/views/code_sections.html", ".page_end");

placeHTMLSourceCode();
addTitle();

function replaceHTML(path, target) {
    return new Promise((resolve, reject) => {
        try {
            const targetElem = document.querySelector(target);

            let xml = new XMLHttpRequest();
            xml.open("GET", path);

            xml.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    targetElem.outerHTML = this.responseText;
                    resolve();
                }
            };

            xml.send();
        } catch (e) {
            console.error(e);
        }
    })
}

async function placeHTMLSourceCode() {
    await codePromise;
    try {
        document.querySelector('.html_code').innerText = document.querySelector('.page').innerHTML;
    } catch (e) {
        console.error(e);
        document.querySelector('.html_code').innerText = "Error loading file: " + e;
    }
}

function addTitle() {

    let taskName = "Задача " + document.location.pathname.split('/').pop().match('.*(?=\\.)')[0];
    if (taskName.match(/\d+-\d+/)) {
        const head = document.querySelector('head');
        const page = document.querySelector('.page');

        const h1 = document.createElement('h1');
        const title = document.createElement('title');
        h1.innerText = taskName;
        title.innerText = taskName;

        head.append(title);
        page.prepend(h1);
    }
}

function toggleSection(className) { // Used in /views/code_sections.html 
    for (const i of document.getElementsByClassName(className)) {
        i.classList.toggle('off');
    }
}

async function replaceCodeSection(path, targetElem) { // Used inside html in <script> to choose which code section to place
    await codePromise;
    let target;
    try {
        let fullPath = location.origin + path;
        target = document.getElementsByClassName(targetElem)[0];
        let xhttp = new XMLHttpRequest();

        xhttp.open('GET', fullPath, true);
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                target.innerHTML = "<br>";
                target.innerText += this.responseText;
            }
        }

        xhttp.send();
    } catch (e) {
        console.error(e);
        if (target) target.innerText = "Error loading file: " + e;
    };
}