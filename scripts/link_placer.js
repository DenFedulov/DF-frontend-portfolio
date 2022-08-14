'use strict';

class LinkPlacer {

    constructor() {
        this.links = [];
        this.uls = document.querySelectorAll('.link_parent');
    }

    init() {
        this.getFile("links.txt", this.links).then(() => {
            this.renderElements();
        });
    }

    getFile(path) {
        return new Promise((resolve) => {
            try {
                let xml = new XMLHttpRequest();
                xml.open("GET", path);

                xml.onreadystatechange = () => {
                    if (xml.readyState === 4 && xml.status === 200) {
                        this.splitLinesBySections(splitTextByLines(xml.responseText));
                        resolve();
                    }
                };

                xml.send();
            } catch (e) {
                console.error(e);
            }
        })
    }

    renderElements() {

        for (let i = 0; i < this.links.length; i++) {
            if (Object.hasOwnProperty.call(this.links, i)) {
                const section = this.links[i];
                for (const line of section) {
                    let liElem = document.createElement('li');

                    let link = this.createLink(line);

                    liElem.append(...link);
                    this.uls[i].append(liElem);
                }
            }
        }
    }

    createLink(line) {
        let url = line.slice(0, line.indexOf(' '));
        let rest = line.slice(line.indexOf(' ') + 1);
        let arrow = rest.slice(0, rest.indexOf(' '));
        let name = rest.slice(rest.indexOf(' ') + 1);

        if (arrow == '>') {
            url = location.pathname + 'views/' + url;
            return createInternalLink(url, name);
        } else {
            return createRegularLink(url, rest + " (" + url.match('(?<=://).*?\.*?(?=/)')?.[0] + ")");
        }
    }

    splitLinesBySections(array) {
        let splitPoints = [-1];
        for (let i = 0; i < array.length; i++) {
            if (array[i] == '-') {
                splitPoints.push(i);
            }
        }
        for (let j = 0; j < splitPoints.length; j++) {
            if (j != splitPoints.length) {
                this.links.push(array.slice(splitPoints[j] + 1, splitPoints[j + 1]));
            } else {
                this.links.push(array.slice(splitPoints[j]));
            }
        }
    }
}

new LinkPlacer().init();