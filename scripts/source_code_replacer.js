'use strict';

const headerPromise = replaceHTML("/views/homeheader.html", ".page_start");
const codePromise = replaceHTML("/views/code_sections.html", ".page_end");

placeHTMLSourceCode();

function toggleSection(className) {
    for (const i of document.getElementsByClassName(className)) {
        i.classList.toggle('off');
    }
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

async function replaceCodeSection(path, target) {
    await codePromise;
    let targetElem;
    try {
        let fullPath = location.origin + path;
        targetElem = document.getElementsByClassName(target)[0];
        let xhttp = new XMLHttpRequest();

        xhttp.open('GET', fullPath, true);
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                targetElem.innerHTML = "<br>";
                targetElem.innerText += this.responseText;
            }
        }

        xhttp.send();
    } catch (e) {
        console.error(e);
        if (targetElem) targetElem.innerText = "Error loading file: " + e;
    };
}

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
