'use strict';

const sidebar_frame = window.parent.document.querySelector('.sidebar_frame');
const app_frame = window.parent.document.querySelector('.app_frame');

function load(target, path) {
    if (path !== location.pathname) {
        if (window === window.parent && target === 'sidebar') toggleSidebar(true);
        if (target === 'sidebar') {
            sidebar_frame.src = path;
        }
        if (target === 'app') {
            app_frame.src = path;
        }
    }
}

function createDirectLinkElement(path) {
    let directLink = document.createElement('a');

    directLink.classList.add('directLink');
    directLink.href = path;
    directLink.innerText = " >";
    directLink.target = "_parent";

    return directLink;
}

function createInternalLink(path, name) {
    let linkElem = document.createElement('a');

    linkElem.addEventListener('click', () => load('app', path)); // from app.js
    linkElem.innerText = name;

    let directLinkElem = createDirectLinkElement(path);

    return [linkElem, directLinkElem];
}

function createRegularLink(url, name) {
    let linkElem = document.createElement('a');
    linkElem.href = url;
    linkElem.target = "_blank";
    linkElem.innerText = name;

    return [linkElem];
}

function splitTextByLines(text, array = []) {
    let noReturnsText = text.replace(/\r/g, '');
    for (const line of noReturnsText.split('\n')) {
        array.push(line);
    }
    return array;
}