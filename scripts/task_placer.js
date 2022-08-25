'use strict';

class TaskPlacer {

    constructor() {
        this.sectionElems = document.querySelectorAll('.section');
        this.tasksFolderPath = '/views/learn_js_ru_tasks/tasks/';
    }

    async init() {
        let existingTasks = await this.getExistingTasks();
        let sectionToTasksMap = new Map();

        for (let i = 0; i < existingTasks.length; i++) {
            if (this.newSections[i] == undefined) {
                sectionToTasksMap.set(this.sectionElems[i], existingTasks[i]);
            }
        }

        sectionToTasksMap.forEach((tasks, section) => {
            this.renderSection(section, tasks);
        });
    }

    createLinkElement(path, taskName) {
        let link = createInternalLink(path, taskName);

        link.innerText = "Задача " + taskName;

        return link;
    }

    async checkForTask(taskName) {
        let fullPath = this.tasksFolderPath + taskName + '.html';
        let request = fetch(fullPath, { method: 'HEAD' });
        let response = await request;

        return response.status == 200 ? true : false;
    }

    renderSection(section, tasks) {
        const ulElem = document.createElement('ul');
        section.append(ulElem);

        for (let i = 0; i < tasks.length; i++) {
            const taskName = tasks[i];
            const liElem = document.createElement('li');

            let fullPath = this.tasksFolderPath + taskName + '.html';

            let link = this.createLinkElement(fullPath, taskName);

            liElem.append(link);

            ulElem.append(liElem);
        }
    }

    async getExistingTasks() {
        const existingTasks = [];
        let checkPromise;
        this.newSections = [];

        for (let taskNum = 1; taskNum == 1 || await this.checkForTask(taskNum + '-' + 1); taskNum++) {
            let item = localStorage.getItem(taskNum);
            if (item == null) {
                let existingSectionTasks = [];
                for (let taskCount = 1; await checkPromise || taskCount == 1; taskCount++) {
                    let taskName = taskNum + '-' + taskCount;
                    checkPromise = this.checkForTask(taskName);
                    checkPromise.then((value) => { if (value) { existingSectionTasks.push(taskName) } });
                }
                existingTasks.push(existingSectionTasks);

                this.renderSection(this.sectionElems[taskNum - 1], existingSectionTasks)

                this.newSections.push(taskNum);
                localStorage.setItem(taskNum, existingSectionTasks);
            } else {
                existingTasks.push(item.split(','));
            }
        }
        console.clear();

        return existingTasks;
    }

}

new TaskPlacer().init();