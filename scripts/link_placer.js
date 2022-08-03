'use strict';

class LinkPlacer {

    constructor() {
        this.intLinks = [];
        this.extLinks = [];

        this.intUl = document.querySelector('.int');
        this.extUl = document.querySelector('.ext');
    }

    init() {
        this.getFiles("intLinks.txt", this.intLinks).then(() => {
            this.renderElements(this.intUl, this.intLinks);
        });

        this.getFiles("extLinks.txt", this.extLinks).then(() => {
            this.renderElements(this.extUl, this.extLinks);
        });
    }

    getFiles(path, array) {
        return new Promise((resolve, reject) => {
            try {
                let xml = new XMLHttpRequest();
                xml.open("GET", path);

                xml.onreadystatechange = function () {
                    if (this.readyState === 4 && this.status === 200) {
                        let noReturnsText = this.responseText.replace(/\r/g, '');
                        for (const line of noReturnsText.split('\n')) {
                            array.push(line);
                        }
                        resolve();
                    }
                };

                xml.send();
            } catch (e) {
                console.error(e);
            }
        })
    }

    renderElements(parent, links) {
        for (const line of links) {
            let path = line.slice(0, line.indexOf(' '));
            let name = line.slice(line.indexOf(' ') + 1);

            let liElem = document.createElement('li');
            if (parent == this.intUl) {
                let linkElem = document.createElement('a');
                let directLinkElem = document.createElement('a');

                linkElem.addEventListener('click', () => load('app', path)); // from app.js
                linkElem.innerText = name;

                directLinkElem.classList.add('directLink');
                directLinkElem.href = path;
                directLinkElem.innerText = " >";
                directLinkElem.target = "_parent";

                liElem.append(linkElem);
                liElem.append(directLinkElem);
            }

            if (parent == this.extUl) {
                let extLinkElem = document.createElement('a');

                extLinkElem.href = path;
                extLinkElem.target = "_blank";
                extLinkElem.innerText = name + " (" + path.match('(?<=://).*?\.*?(?=/)')[0] + ")";


                liElem.append(extLinkElem);
            }

            parent.append(liElem);
        }

    }

}

new LinkPlacer().init();