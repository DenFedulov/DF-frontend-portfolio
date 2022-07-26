'use strict';

function Router(routeArray, targetArray) {
    try {
        if (routeArray === undefined || targetArray === undefined) {
            throw 'Error: routeArray and targetArray params are required'
        }
        this.constructor(routeArray, targetArray);
        this.init();
    }
    catch (e) {
        console.error(e);
    }
}

Router.prototype = {

    htmlFolderPath: '/views/',
    routeArray: undefined,
    targetArray: undefined,
    lastTargetElem: undefined,

    constructor: function (routeArray, targetArray) {
        this.routeArray = routeArray;
        this.targetArray = targetArray;
    },

    init: function () {
        //Custom event in changeURL() function from app.js 
        addEventListener('urlchanged', (e) => {
            this.pathChange(this.routeArray);
        })
        this.pathChange(this.routeArray);
    },

    pathChange: function (routeArray) {
        const fullPath = location.pathname;
        let targetElemNum;
        if (fullPath.match(/[/]views/) !== null) {
            const name = fullPath.replace('/views/', '');
            targetElemNum = determineTarget(name);

            for (let i = 0; i < routeArray.length; i++) {
                if (routeArray[i].isActivePath(fullPath)) {
                    this.loadRoute(routeArray[i]);
                    return;
                }
            }

            this.createRoute(name, targetElemNum);

        } else {
            for (let i = 0; i < routeArray.length; i++) {
                if (routeArray[i].default) {
                    this.loadRoute(routeArray[i]);
                }
            }
        }
    },

    loadRoute: function (route) {
        let path = location.origin + this.htmlFolderPath + route.name;
        let target = route.targetElem;
        this.lastTargetElem = target;
        let xhttp = new XMLHttpRequest();

        xhttp.open('GET', path, true);
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                target.innerHTML = this.responseText;
            }
        }

        xhttp.send();
    },

    createRoute: function (routeStr, targetElemNum) {
        let path = location.origin + this.htmlFolderPath + routeStr;
        let xhttp = new XMLHttpRequest();

        xhttp.open('GET', path, true);
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                const route = new Route(routeStr, this.targetArray[targetElemNum]);
                this.routeArray.push(route);
                this.loadRoute(route);
            }
            if (xhttp.readyState === 4 && xhttp.status >= 400 && xhttp.status < 500) {
                console.error('Enable to load the page. Error: ' + xhttp.status)
            }
        }

        xhttp.send();
    }
}