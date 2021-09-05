"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initStore = void 0;
const electron_store_1 = __importDefault(require("electron-store"));
const package_json_1 = require("../package.json");
let store;
const initStore = () => {
    const schema = {
        isDefaultBrowser: {
            type: 'boolean',
            default: false
        },
        url: {
            type: 'string',
            default: ''
        },
        appVersion: {
            type: 'string',
            default: package_json_1.version
        },
        progId: {
            type: 'string',
            default: ''
        },
        currentPage: {
            type: 'string',
            default: '/'
        },
        shouldSaveDomain: {
            type: 'boolean',
            default: false
        },
        openInFirst: {
            type: 'boolean',
            default: false
        },
        appClosed: {
            type: 'boolean',
            default: false
        },
        showHidden: {
            type: 'boolean',
            default: false
        },
        dragEnabled: {
            type: 'boolean',
            default: false
        },
        grid: {
            type: 'array',
            default: []
        }
    };
    store = new electron_store_1.default({
        watch: true,
        schema
    });
    // store.openInEditor()
    return store;
};
exports.initStore = initStore;
