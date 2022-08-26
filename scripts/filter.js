'use strict';

class Filter {

    constructor() {
        this.filterDiv = document.createElement('div');
        this.inputElem = document.createElement('input');
        this.filterModeToggleButton = document.createElement('button');

        this.filterMode = 'Links';
        try {
            this.page = document.querySelector('.page');
            this.sectionElems = document.querySelectorAll('.section');
            this.orderedSections = Array.prototype.slice.call(this.sectionElems, 0);
        } catch (e) {
            console.error(e);
        }
    }

    init() {
        this.filterDiv.classList.add('filter');

        this.inputElem.type = 'text';
        this.inputElem.placeholder = 'filter';
        this.inputElem.addEventListener('input', () => this.filterUpdate(this.inputElem.value));

        this.filterModeToggleButton.innerText = this.filterMode;
        this.filterModeToggleButton.addEventListener('click', (e) => {
            this.filterModeToogle();
            this.filterModeToggleButton.innerText = this.filterMode;
            this.filterUpdate(this.inputElem.value);
        });
        this.filterModeToggleButton.classList.add('no_select');

        this.filterDiv.append(this.inputElem, this.filterModeToggleButton);

        document.querySelector('body').prepend(this.filterDiv);
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

    selectTargetElems(sectionElem) {
        if (this.filterMode == 'Links') {
            return [sectionElem.querySelectorAll('li')];
        } else {
            return [sectionElem.querySelector('h1'), sectionElem.querySelectorAll('a')];
        }
    }

    updateSections(filterQuery) {
        for (let i = 0; i < this.sectionElems.length; i++) {
            const sectionElem = this.sectionElems[i];
            if (filterQuery != '') {
                const [sectionName, sectionLinks] = this.selectTargetElems(sectionElem);

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
                const [liElems] = this.selectTargetElems(sectionElem);

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