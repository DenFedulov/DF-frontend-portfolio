'use strict';

class Filter {

    constructor() {
        try {
            this.sectionElems = document.querySelectorAll('.section');
        } catch (e) {
            console.error(e);
        }
    }

    init() {
        const filterDiv = document.createElement('div');
        const inputElem = document.createElement('input');

        filterDiv.classList.add('filter');

        inputElem.type = 'text';
        inputElem.placeholder = 'filter';
        inputElem.addEventListener('input', (e) => this.filterUpdate(e));

        filterDiv.append(inputElem);

        document.querySelector('body').prepend(filterDiv);
    }

    filterUpdate(e) {
        let inputValue = e.target.value;
        for (const i in this.sectionElems) {
            if (Object.hasOwnProperty.call(this.sectionElems, i)) {
                const sectionElem = this.sectionElems[i];
                if (inputValue != '') {
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
                                if (name.match(new RegExp(inputValue, 'i')) != null) {
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

    }

}

new Filter().init();