"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const browserWindowConfig = {
    // useContentSize: true,
    center: true,
    backgroundColor: '#1f2937',
    // fullscreenable: false,
    // maximizable: false,
    // fullscreen: false,
    icon: (0, path_1.join)(__dirname, '../buildResources/appx/StoreLogo.png'),
    // titleBarStyle: 'hiddenInset',
    height: 430,
    width: 655,
    frame: false,
    transparent: false,
    // show: false,
    thickFrame: false,
    webPreferences: {
        preload: (0, path_1.join)(__dirname, 'preload.js'),
        nodeIntegration: true,
        contextIsolation: false,
        textAreasAreResizable: false,
        defaultEncoding: 'UTF-8',
        disableHtmlFullscreenWindowResize: true,
        spellcheck: false
    }
};
exports.default = browserWindowConfig;
