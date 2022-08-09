'use strict';

class Filter {

    constructor() {
        try {
            this.filterMode = 'Links';
            this.sectionElems = document.querySelectorAll('.section');
        } catch (e) {
            console.error(e);
        }
    }

    init() {
        const filterDiv = document.createElement('div');
        const inputElem = document.createElement('input');
        const filterModeToggleButton = document.createElement('button');

        filterDiv.classList.add('filter');

        inputElem.type = 'text';
        inputElem.placeholder = 'filter';
        inputElem.addEventListener('input', () => this.filterUpdate(inputElem.value));

        filterModeToggleButton.innerText = this.filterMode;
        filterModeToggleButton.addEventListener('click', (e) => {
            this.filterModeToogle();
            filterModeToggleButton.innerText = this.filterMode;
            this.filterUpdate(inputElem.value);
        });

        filterDiv.append(inputElem);
        filterDiv.append(filterModeToggleButton);

        document.querySelector('body').prepend(filterDiv);
    }

    filterModeToogle() {
        if (this.filterMode == 'Sections') {
            this.filterMode = 'Links';
        } else if (this.filterMode == 'Links') {
            this.filterMode = 'Sections';
        }
    }

    filterUpdate(filterQuery) {
        this.restoreAllElements();

        if (this.filterMode == 'Sections') {
            this.updateSections(filterQuery);
        }
        if (this.filterMode == 'Links') {
            this.updateLis(filterQuery);
        }
    }

    restoreAllElements() {
        for (const i in this.sectionElems) {
            if (Object.hasOwnProperty.call(this.sectionElems, i)) {
                const sectionElem = this.sectionElems[i];
                sectionElem.classList.toggle('off', false);

                const liElems = sectionElem.querySelectorAll('li');
                for (const j in liElems) {
                    if (Object.hasOwnProperty.call(liElems, j)) {
                        const liElem = liElems[j];
                        liElem.classList.toggle('off', false);
                    }
                }
            }
        }
    }

    updateSections(filterQuery) {
        for (let i = 0; i < this.sectionElems.length; i++) {
            const sectionElem = this.sectionElems[i];
            if (filterQuery != '') {
                const sectionName = sectionElem.querySelector('h1');
                const sectionLinks = sectionElem.querySelectorAll('a');

                const namesToCheck = [];
                if (sectionName != undefined) {
                    namesToCheck.push(sectionName.innerText);
                }
                for (const i in sectionLinks) {
                    if (Object.hasOwnProperty.call(sectionLinks, i)) {
                        const linkElem = sectionLinks[i];
                        namesToCheck.push(linkElem.innerText);
                    }
                }

                let noMatch = true;
                for (const i in namesToCheck) {
                    if (Object.hasOwnProperty.call(namesToCheck, i)) {
                        const name = namesToCheck[i];
                        try {
                            if (name.match(new RegExp(filterQuery, 'i')) != null) {
                                noMatch = false;
                            }
                        } catch (e) {

                        }
                    }
                }
                sectionElem.classList.toggle('off', noMatch);
            } else {
                sectionElem.classList.toggle('off', false);
            }
        }
    }

    updateLis(filterQuery) {
        for (let i = 0; i < this.sectionElems.length; i++) {
            const sectionElem = this.sectionElems[i];
            if (filterQuery != '') {
                const liElems = sectionElem.querySelectorAll('li');

                const sectionCheckArray = [];
                for (let j = 0; j < liElems.length; j++) {
                    const liElem = liElems[j];

                    const liLinks = liElem.querySelectorAll('a');

                    const namesToCheck = [];
                    for (const i in liLinks) {
                        if (Object.hasOwnProperty.call(liLinks, i)) {
                            const linkElem = liLinks[i];
                            namesToCheck.push(linkElem.innerText);
                        }
                    }

                    let noMatch = true;
                    for (const i in namesToCheck) {
                        if (Object.hasOwnProperty.call(namesToCheck, i)) {
                            const name = namesToCheck[i];
                            try {
                                if (name.match(new RegExp(filterQuery, 'i')) != null) {
                                    noMatch = false;
                                }
                            } catch (e) {

                            }
                        }
                    }
                    if (noMatch) sectionCheckArray.push(noMatch);
                    liElem.classList.toggle('off', noMatch);
                }
                if (liElems.length == sectionCheckArray.length) {
                    sectionElem.classList.toggle('off', true);
                }

            } else {
                sectionElem.classList.toggle('off', false);
            }
        }
    }
}

new Filter().init();