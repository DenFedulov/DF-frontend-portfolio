'use strict';

class HomePageFormatter {

    constructor() {
        this.header = document.querySelector('.header');
        this.appFrame = document.querySelector('.app_frame');

        this.combos = document.querySelectorAll('.combo');

        this.sidebar = document.querySelector('.sidebar');
        this.sidebarToggleButton = document.querySelector('.sidebar_toggle_button');
        this.sidebarFrame = document.querySelector('.sidebar_frame');

        this.lockScroll = document.querySelector('.lock_scroll');

        this.enableScrollFormat = true;
    }

    init() {
        this.lockScroll.classList.toggle("on", !this.enableScrollFormat);

        for (const combo of this.combos) {
            combo.parentElement.addEventListener('mouseover', function () {
                this.IsMouseOn = true;
                combo.classList.remove('off');
            });

            combo.parentElement.addEventListener('mouseout', function () {
                this.IsMouseOn = false;
                setTimeout(() => {
                    if (this.IsMouseOn == false) {
                        combo.classList.add('off');
                    }
                }, 300)
            });
        }

        this.appFrame.contentWindow.addEventListener('wheel', (e) => {
            if (this.enableScrollFormat) {
                if (e.deltaY > 0) {
                    this.windowScrollToggle(false);
                } else {
                    this.windowScrollToggle(true);
                }
            }
        });

        window.addEventListener('sidebarLoaded', () => {
            this.toggleSidebar(true);
        });

        return this;
    }

    toggleSidebar(enableSidebar) {
        if (enableSidebar !== undefined) {
            enableSidebar = !enableSidebar;
        }

        this.sidebar.classList.toggle("off", enableSidebar);
        this.sidebarFrame.classList.toggle("off", enableSidebar);

        this.sidebarToggleButton.classList.toggle("off", enableSidebar);
    }

    lockScrollToggle() {
        this.lockScroll.classList.toggle("on", this.enableScrollFormat);
        this.enableScrollFormat = !this.enableScrollFormat;
    }

    windowScrollToggle(enableHeader) {
        if (enableHeader !== undefined) {
            enableHeader = !enableHeader;
        }

        this.header.classList.toggle('off', enableHeader);
        this.lockScroll.classList.toggle('off', enableHeader);
    }

}

const homePageFormatter = new HomePageFormatter().init();