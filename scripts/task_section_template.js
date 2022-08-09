"use strict";

const taskSectionTemplate = document.createElement('div');
taskSectionTemplate.classList.add('taskSectionTemplate');

const inputs = document.createElement('p');
const link = document.createElement('input');
link.placeholder = 'link';
const themeName = document.createElement('input');
themeName.placeholder = 'name';
const taskNum = document.createElement('input');
taskNum.placeholder = 'number';
const taskCount = document.createElement('input');
taskCount.placeholder = 'count';
inputs.append(link, themeName, taskNum, taskCount);

const templateButton = document.createElement('button');
templateButton.innerText = "create";

const templateText = document.createElement('div');
templateText.classList.add('templateText');

const tempElem = document.createElement('div');
tempElem.classList.add('section');
const tempH1 = document.createElement('h1');
const tempA = document.createElement('a');
tempA.target = '_blank';
const tempUl = document.createElement('ul');
tempH1.append(tempA);
tempElem.append(tempH1, tempUl);

templateButton.addEventListener('click', () => {
    tempA.href = link.value;
    tempA.innerText = themeName.value;
    for (let i = 1; i <= +taskCount.value; i++) {
        let li = document.createElement('li');
        li.classList.add(taskNum.value + '-' + i);
        tempUl.append(li);
    }
    templateText.innerText = tempElem.outerHTML;
});

taskSectionTemplate.append(inputs, templateButton, templateText);



document.querySelector('body').prepend(taskSectionTemplate);

const cssLink = document.createElement('link');
cssLink.rel = "stylesheet";
cssLink.type = "text/css";
cssLink.href = "/style/task_section_template.css"
document.querySelector('head').append(cssLink);