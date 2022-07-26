'use strict';

const sidebar_frame = window.parent.document.querySelector('.sidebar_frame');
const app_frame = window.parent.document.querySelector('.app_frame');

function load(target, path) {
    if (path !== location.pathname) {
        if (window === window.parent && target === 'sidebar') toggleSidebar(true);
        if (target === 'sidebar') {
            sidebar_frame.src = path;
        }
        if (target === 'app') {
            app_frame.src = path;
        }
    }
}
