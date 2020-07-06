"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
// crashReporter.start({});
// メインウィンドウの参照をグローバルに持っておく。
var mainWindow = null;
var menuItems = [
    {
        label: 'File',
        submenu: [{
                label: 'アプリを終了',
                accelerator: 'Cmd+Q',
                click: function () {
                    electron_1.app.quit();
                }
            }]
    },
    {
        label: 'Window',
        submenu: [{
                label: '最小化',
                accelerator: 'Cmd+M',
                click: function () {
                    mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.minimize();
                }
            }, {
                label: '最大化',
                accelerator: 'Cmd+Ctrl+F',
                click: function () {
                    mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.maximize();
                }
            }, {
                type: 'separator'
            }, {
                label: 'リロード',
                accelerator: 'Cmd+R',
                click: function () {
                    var _a;
                    (_a = electron_1.BrowserWindow.getFocusedWindow()) === null || _a === void 0 ? void 0 : _a.reload();
                }
            }]
    }
];
function createWindow() {
    // 新規ウィンドウ作成
    mainWindow = new electron_1.BrowserWindow({ width: 800, height: 600, webPreferences: {
            nodeIntegration: false,
            contextIsolation: false,
            preload: __dirname + '/preload.js'
        } });
    // index.htmlを開く
    mainWindow.loadURL('file://' + __dirname + '/../view/index.html');
    // ウィンドウが閉じられたら、ウィンドウへの参照を破棄する。
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
    var menu = electron_1.Menu.buildFromTemplate(menuItems);
    electron_1.Menu.setApplicationMenu(menu);
}
electron_1.app.on('ready', function () {
    createWindow();
});
// すべてのウィンドウが閉じられた際の動作
electron_1.app.on('window-all-closed', function () {
    // OS X では、ウィンドウを閉じても一般的にアプリ終了はしないので除外。
    if (process.platform != 'darwin') {
        mainWindow = null;
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', function () {
    // macOSでは、ユーザがドックアイコンをクリックしたとき、
    // そのアプリのウインドウが無かったら再作成するのが一般的です。
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
