'use strict';

class TaskPlacer {

    constructor() {
        this.taskElems = document.querySelectorAll('.section li');
        this.tasksFolderPath = '/views/tasks/';
    }

    init() {
        for (const elem of this.taskElems) {

            let fullPath = this.tasksFolderPath + elem.className + '.html';

            let link = this.createLinkElement(fullPath, elem);
            let directLink = createDirectLinkElement(fullPath);

            elem.append(link);
            elem.append(directLink);

        }
    }

    createLinkElement(path, parent) {
        let link = document.createElement('a');

        link.addEventListener('click', () => load('app', path)); // from app.js
        link.innerText = "Задача " + parent.className;

        return link;
    }



}

new TaskPlacer().init();