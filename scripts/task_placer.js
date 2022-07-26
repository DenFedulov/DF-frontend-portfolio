'use strict';

const taskElems = document.querySelectorAll('.section li');
const TASKS_FOLDER_PATH = '/views/tasks/';

for (const elem of taskElems) {
    let link = document.createElement('a');
    let directLink = document.createElement('a');

    let fullPath = TASKS_FOLDER_PATH + elem.className + '.html';

    link.addEventListener('click', () => load('app', fullPath)); // from app.js
    link.innerText = "Задача " + elem.className;

    directLink.classList.add('directLink');
    directLink.href = fullPath;
    directLink.innerText = " >";
    directLink.target = "_parent";

    elem.append(link);
    elem.append(directLink);

}