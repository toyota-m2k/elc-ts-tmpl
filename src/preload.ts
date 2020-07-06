/*
 * Render Process 開始前に呼び出されるスクリプト 
 * nodeIntegrationの値をfalseのまま、レンダラープロセスでNode.jsのモジュールを利用できるようにする方法の一つ
 */

import electron  from 'electron';

process.once('loaded', () => {
    window.ipcRenderer = electron.ipcRenderer;
    window.app = electron.remote.app;
});