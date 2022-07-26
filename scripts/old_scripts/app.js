'use strict';

//Function for loading new pages. If name containes '/' this will load to .app and to .sidebar_wrap if it doesn't
function load(name) {
    let path = location.origin + '/views/' + name;
    toggleSidebar(true);
    if (path !== location.origin + location.pathname) {
        history.pushState('', '', path);
    }
}

function init() {
    const sidebar_wrap = document.querySelector('.sidebar_wrap');
    const app_wrap = document.querySelector('.app_wrap');

    changeURL(new Router([new Route('html', sidebar_wrap, true)
        , new Route('intro', app_wrap, true)], [sidebar_wrap, app_wrap]));
}

function changeURL(router) {
    let oldHref = location.href;

    const event = new CustomEvent('urlchanged', {
        detail: router
    });

    setInterval(() => {
        if (oldHref !== location.href) {
            oldHref = location.href;
            dispatchEvent(event);
        }
    }, 50);
}

function determineTarget(name) {
    if (name.match(/[/]/) !== null) {
        return 1;
    } else {
        return 0;
    }
}

init();