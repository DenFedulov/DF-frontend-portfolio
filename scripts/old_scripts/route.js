'use strict';

function Route(name, targetElem, isDefault) {
    try {
        if (name === undefined || targetElem === undefined) {
            throw 'Error: name and targetElem params are required'
        }
        this.constructor(name, targetElem, isDefault);
    }
    catch (e) {
        console.error(e);
    }
}

Route.prototype = {
    name: undefined,
    targetElem: undefined,
    default: undefined,
    constructor: function (name, targetElem, isDefault) {
        this.name = name;
        this.targetElem = targetElem;
        this.default = isDefault;
    },
    isActivePath: function (path) {
        return (path === '/views/' + this.name + '/' || path === '/views/' + this.name);
    }
}