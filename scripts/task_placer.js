'use strict';

class TaskPlacer {

    constructor() {
        this.sectionElems = document.querySelectorAll('.section');
        this.tasksFolderPath = '/views/learn_js_ru_tasks/tasks/';
    }

    async init() {
        let existingTasks = await this.getExistingTasks();
        const sectionsToTasksMap = new Map();

        for (let i = 0; i < existingTasks.length; i++) {
            sectionsToTasksMap.set(this.sectionElems[i], existingTasks[i])
        }

        sectionsToTasksMap.forEach((tasks, section) => {

        });
    }

    createLinkElement(path, taskName) {
        let link = document.createElement('a');

        link.addEventListener('click', () => load('app', path)); // from app.js
        link.innerText = "Задача " + taskName;

        return link;
    }

    async checkForTask(taskName) {
        let fullPath = this.tasksFolderPath + taskName + '.html';
        let resp = await fetch(fullPath, { method: 'HEAD' }).catch();

        return resp.status == 200 ? true : false;
    }

    renderSection(section, tasks) {
        const ulElem = document.createElement('ul');
        section.append(ulElem);

        for (let i = 0; i < tasks.length; i++) {
            const taskName = tasks[i];
            const liElem = document.createElement('li');

            let fullPath = this.tasksFolderPath + taskName + '.html';

            let link = this.createLinkElement(fullPath, taskName);
            let directLink = createDirectLinkElement(fullPath);

            liElem.append(link);
            liElem.append(directLink);

            ulElem.append(liElem);
        }
    }

    async getExistingTasks() {
        const existingTasks = [];
        let checkPromise;
        const sectionsToTasksMap = new Map();

        for (let taskNum = 1; await this.checkForTask(taskNum + '-' + 1) || taskNum == 1; taskNum++) {
            let existingSectionTasks = [];
            for (let taskCount = 1; await checkPromise || taskCount == 1; taskCount++) {
                let taskName = taskNum + '-' + taskCount;
                checkPromise = this.checkForTask(taskName);
                checkPromise.then((value) => { if (value) { existingSectionTasks.push(taskName) } });
            }
            existingTasks.push(existingSectionTasks);

            this.renderSection(this.sectionElems[taskNum - 1], existingSectionTasks)

            console.clear();
        }
        console.clear();

        return existingTasks;
    }

}

new TaskPlacer().init();