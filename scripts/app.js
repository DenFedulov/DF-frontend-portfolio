'use strict';

const sidebarFrame = window.parent.document.querySelector('.sidebar_frame');
const appFrame = window.parent.document.querySelector('.app_frame');

function load(target, path) {
    if (path !== location.pathname) {
        if (target === 'sidebar') {
            sidebarFrame.src = path;
            sidebarLoadedEvent();
        }
        if (target === 'app') {
            appFrame.src = path;
        }
    }
}

function sidebarLoadedEvent() {
    const event = new CustomEvent('sidebarLoaded');
    window.parent.dispatchEvent(event);
}