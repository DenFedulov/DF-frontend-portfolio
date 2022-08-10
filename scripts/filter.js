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
        for (let i = 0; i < this.sectionElems.length; i++) {
            const sectionElem = this.sectionElems[i];
            sectionElem.classList.toggle('off', false);

            const liElems = sectionElem.querySelectorAll('li');
            for (let j = 0; j < liElems.length; j++) {
                liElems[j].classList.toggle('off', false);
            }
        }
    }

    isNoMatches(list, query) {
        for (let i = 0; i < list.length; i++) {
            try {
                if (list[i].match(new RegExp(query, 'i')) != null) {
                    return false;
                }
            } catch (e) { }
        }
        return true;
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
                for (let i = 0; i < sectionLinks.length; i++) {
                    namesToCheck.push(sectionLinks[i].innerText);
                }

                let noMatch = this.isNoMatches(namesToCheck, filterQuery);

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
                    for (let i = 0; i < liLinks.length; i++) {
                        namesToCheck.push(liLinks[i].innerText);
                    }

                    let noMatch = this.isNoMatches(namesToCheck, filterQuery);

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