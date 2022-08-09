'use strict';

class LinkPlacer {

    constructor() {
        this.links = [];
        this.extraLinks = [];
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
                        this.parseOutExtraLinks(splitTextByLines(xml.responseText, this.links));
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
        for (const line of this.links) {
            let liElem = document.createElement('li');

            let [link, isInternal] = this.createLink(line);

            liElem.append(...link);

            if (isInternal) {
                this.uls[0].append(liElem);
            } else {
                this.uls[1].append(liElem);
            }
        }
        for (const line of this.extraLinks) {
            let liElem = document.createElement('li');

            let [link] = this.createLink(line);

            liElem.append(...link);
            this.uls[2].append(liElem);
        }
    }

    createLink(line) {
        let url = line.slice(0, line.indexOf(' '));
        let rest = line.slice(line.indexOf(' ') + 1);
        let arrow = rest.slice(0, rest.indexOf(' '));
        let name = rest.slice(rest.indexOf(' ') + 1);

        if (arrow == '>') {
            return [createInternalLink(url, name), true];
        } else {
            return [createRegularLink(url, arrow + " " + name + " (" + url.match('(?<=://).*?\.*?(?=/)')?.[0] + ")"), false];
        }
    }

    isLinkInternal(line) {
        if (line != undefined) {
            let url = line.slice(0, line.indexOf(' '));
            let rest = line.slice(line.indexOf(' ') + 1);
            let arrow = rest.slice(0, rest.indexOf(' '));
            let name = rest.slice(rest.indexOf(' ') + 1);

            if (arrow == '>') {
                return true;
            } else {
                return false;
            }
        }
    }

    parseOutExtraLinks(links) {
        let afterIntLinks;
        for (let i = 0; i < links.length; i++) {
            if (!this.isLinkInternal(links[i + 1])) {
                afterIntLinks = links.slice(i + 1, links.length);
                break;
            }
        }
        for (let i = 0; i < afterIntLinks.length; i++) {
            if (this.isLinkInternal(afterIntLinks[i + 1])) {
                this.links = links.slice(0, i + 1 + links.length - afterIntLinks.length);
                this.extraLinks = afterIntLinks.slice(i + 1, afterIntLinks.length);
                break;
            }
        }
    }

}

new LinkPlacer().init();