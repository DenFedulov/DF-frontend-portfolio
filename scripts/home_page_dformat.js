'use strict';

const app = document.querySelector('.app');
const sidebar = document.querySelector('.sidebar');
const sidebar_toggle_button = document.querySelector('.sidebar_toggle_button');
const wrapper = document.querySelector('.wrapper');
const header = document.querySelector('.header');
const lock_scroll = document.querySelector('.lock_scroll');

let enable_scroll_format = false;
let scrollDebounce = true;

const appScrollFunction = function () {
    const iwindow = this.contentWindow;

    let prevScroll = iwindow.scrollY;

    iwindow.addEventListener('scroll', () => {
        if (enable_scroll_format && scrollDebounce) {
            scrollDebounce = false;
            if (prevScroll < iwindow.scrollY && window.screenY <= 0) {
                window.scrollTo(0, 100);
                prevScroll = iwindow.scrollY;
            } else {
                window.scrollTo(0, 0);
                prevScroll = iwindow.scrollY;
            }
            updateWrapperHeights();
            setTimeout(() => scrollDebounce = true, 10);
        }
    });
};

app_frame.onload = appScrollFunction;
window.scrollTo(0, 0);

window.addEventListener('resize', () => {
    updateWrapperHeights();
});

function toggleSidebar(enable_sidebar) {
    if (enable_sidebar !== undefined) {
        enable_sidebar = !enable_sidebar;
    }

    sidebar.classList.toggle("sidebar_toggle_off", enable_sidebar);
    document.querySelector('.sidebar_frame').classList.toggle("off", enable_sidebar);

    sidebar_toggle_button.classList.toggle("off", enable_sidebar);

    app.classList.toggle("sidebar_toggle_off", enable_sidebar);
}

function updateWrapperHeights() {
    let height = window.innerHeight - (header.offsetHeight - window.scrollY) + "px";
    sidebar.style.height = height
    app.style.height = height;
}

function windowScrollToggle() {
    if (window.scrollY <= 0) {
        window.scrollTo(0, 100);
    } else {
        window.scrollTo(0, 0);
    }
    updateWrapperHeights();
}

function lock_scroll_toggle() {
    lock_scroll.classList.toggle("on", enable_scroll_format);
    enable_scroll_format = !enable_scroll_format;
}