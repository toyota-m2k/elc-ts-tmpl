"use strict";
/*
 * Render Process 開始前に呼び出されるスクリプト
 * nodeIntegrationの値をfalseのまま、レンダラープロセスでNode.jsのモジュールを利用できるようにする方法の一つ
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = __importDefault(require("electron"));
process.once('loaded', function () {
    window.ipcRenderer = electron_1.default.ipcRenderer;
    window.app = electron_1.default.remote.app;
});
