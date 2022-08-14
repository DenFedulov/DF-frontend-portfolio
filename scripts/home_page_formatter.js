'use strict';

class HomePageFormatter {

    constructor() {
        this.app = document.querySelector('.app');
        this.appFrame = document.querySelector('.app_frame');

        this.sidebar = document.querySelector('.sidebar');
        this.sidebarToggleButton = document.querySelector('.sidebar_toggle_button');
        this.sidebarFrame = document.querySelector('.sidebar_frame');

        this.header = document.querySelector('.header');

        this.lockScroll = document.querySelector('.lock_scroll');

        this.enableScrollFormat = false;
        this.scrollDebounce = true;
    }

    init() {
        window.scrollTo(0, 0);

        window.addEventListener('resize', () => {
            this.updateHeights();
        });

        this.appFrame.onload = () => {
            const iwindow = appFrame.contentWindow;

            let prevScroll = iwindow.scrollY;

            iwindow.addEventListener('scroll', () => {
                if (this.enableScrollFormat && this.scrollDebounce) {
                    this.scrollDebounce = false;
                    if (prevScroll < iwindow.scrollY && window.screenY <= 0) {
                        window.scrollTo(0, 100);
                        prevScroll = iwindow.scrollY;
                    } else {
                        window.scrollTo(0, 0);
                        prevScroll = iwindow.scrollY;
                    }
                    this.updateHeights();
                    setTimeout(() => this.scrollDebounce = true, 10);
                }
            });
        };

        window.addEventListener('sidebarLoaded', () => {
            this.toggleSidebar(true);
        });
    }

    toggleSidebar(enableSidebar) {
        if (enableSidebar !== undefined) {
            enableSidebar = !enableSidebar;
        }

        this.sidebar.classList.toggle("sidebar_toggle_off", enableSidebar);
        this.sidebarFrame.classList.toggle("off", enableSidebar);

        this.sidebarToggleButton.classList.toggle("off", enableSidebar);

        this.app.classList.toggle("sidebar_toggle_off", enableSidebar);
    }

    windowScrollToggle() {
        if (window.scrollY <= 0) {
            window.scrollTo(0, 100);
        } else {
            window.scrollTo(0, 0);
        }
        this.updateHeights();
    }

    lockScrollToggle() {
        this.lockScroll.classList.toggle("on", this.enableScrollFormat);
        this.enableScrollFormat = !this.enableScrollFormat;
    }




    updateHeights() {
        let height = window.innerHeight - (this.header.offsetHeight - window.scrollY) + "px";
        this.sidebar.style.height = height
        this.app.style.height = height;
    }
}

const homePageFormatter = new HomePageFormatter();
homePageFormatter.init();