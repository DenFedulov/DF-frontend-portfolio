"use strict";

class HomePageFormatter {
  constructor() {
    this.header = document.querySelector(".header");

    this.themesCombo = document.createElement("div");
    this.themes = document.querySelector(".themes");

    this.appFrame = document.querySelector(".app_frame");

    this.combos = document.querySelectorAll(".combo");

    this.sidebar = document.querySelector(".sidebar");
    this.sidebarToggleButton = document.querySelector(".sidebar_toggle_button");
    this.sidebarFrame = document.querySelector(".sidebar_frame");

    this.lockScroll = document.querySelector(".lock_scroll");

    this.enableScrollFormat = true;
  }

  init() {
    this.initThemesCombo();

    window.addEventListener("resize", () => this.updateThemes());
    document.addEventListener("click", () => this.contractAllCombos());

    this.toggleSourceOfElem(
      this.lockScroll,
      "/media/lock.png",
      "/media/unlock.png",
      this.enableScrollFormat
    );

    for (const combo of this.combos) {
      combo.parentElement.addEventListener("click", (e) => {
        e.stopPropagation();
        if (!combo.classList.contains("off")) {
          this.contractAllCombos();
          combo.classList.toggle("off");
        }
        combo.classList.toggle("off");
      });
    }

    this.appFrame.onload = () => {
      this.initHeaderToggleEvents(this.appFrame);
    };

    this.sidebarFrame.onload = () => {
      this.initHeaderToggleEvents(this.sidebarFrame);
    };

    window.addEventListener("sidebarLoaded", () => {
      this.toggleSidebar(true);
    });

    window.addEventListener("appLoaded", () => {
      if (window.visualViewport.width <= 800) {
        this.toggleSidebar(false);
      }
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
    this.toggleSourceOfElem(
      this.sidebarToggleButton,
      "/media/sidebar_toggle_button_left.png",
      "/media/sidebar_toggle_button_right.png",
      enableSidebar
    );
  }

  toggleSourceOfElem(elem, s1, s2, isSecond) {
    let path1 = location.origin + s1;
    let path2 = location.origin + s2;
    if (isSecond == undefined) {
      elem.src == path1 ? (elem.src = path2) : (elem.src = path1);
    } else isSecond ? (elem.src = path2) : (elem.src = path1);
  }

  lockScrollToggle() {
    this.enableScrollFormat = !this.enableScrollFormat;
    this.toggleSourceOfElem(
      this.lockScroll,
      "/media/lock.png",
      "/media/unlock.png",
      this.enableScrollFormat
    );
  }

  headerToggle(enableHeader) {
    if (enableHeader !== undefined) {
      enableHeader = !enableHeader;
    }

    this.contractAllCombos();
    this.header.classList.toggle("off", enableHeader);
    this.lockScroll.classList.toggle("off", enableHeader);
    this.themes.classList.toggle("off", enableHeader);
  }

  updateThemes() {
    if (window.visualViewport.width <= 800) {
      this.themes.classList.add("contracted");
      this.themesCombo.append(this.themes);
      this.header.append(this.themesCombo);
    } else {
      this.header.append(this.themes);
      this.themesCombo.remove();
    }
  }

  initThemesCombo() {
    this.themesCombo.classList.add("themes_combo");
    this.themesCombo.innerText = "Themes\n▼";
    this.themesCombo.addEventListener("click", (e) => {
      e.stopPropagation();
      this.themes.classList.toggle("contracted");
    });

    this.updateThemes();
  }

  contractAllCombos() {
    this.themes.classList.add("contracted");
    for (const combo of this.combos) {
      combo.classList.add("off");
    }
  }

  initHeaderToggleEvents(frame) {
    let iwindow = frame.contentWindow;
    let idoc = iwindow.document;

    idoc.addEventListener("click", () => this.contractAllCombos());

    iwindow.addEventListener("wheel", (e) => {
      if (this.enableScrollFormat) {
        this.headerToggle(e.deltaY < 0 ? true : false);
      }
    });

    let touchstartY;
    iwindow.addEventListener("touchstart", (e) => {
      if (this.enableScrollFormat) {
        touchstartY = e.changedTouches[0].screenY;
      }
    });
    iwindow.addEventListener("touchend", (e) => {
      if (this.enableScrollFormat) {
        let pixelsMoved = e.changedTouches[0].screenY - touchstartY;
        if (Math.abs(pixelsMoved) >= 50) {
          this.headerToggle(pixelsMoved > 0);
        }
      }
    });
  }
}

const homePageFormatter = new HomePageFormatter().init();
