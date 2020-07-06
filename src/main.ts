import {app, BrowserWindow, crashReporter, Menu, MenuItem, MenuItemConstructorOptions } from 'electron'
// crashReporter.start({});

// メインウィンドウの参照をグローバルに持っておく。
let mainWindow: BrowserWindow|null = null;

const menuItems : MenuItemConstructorOptions[] = [
  {
    label: 'File',
    submenu: [{
      label: 'アプリを終了',
      accelerator: 'Cmd+Q',
      click: function(){
        app.quit();
      }
    }]
  },
  {
    label: 'Window',
    submenu: [{
      label: '最小化',
      accelerator: 'Cmd+M',
      click: function(){
        mainWindow?.minimize();
      }
    }, {
      label: '最大化',
      accelerator: 'Cmd+Ctrl+F',
      click: function(){
        mainWindow?.maximize();
      }
    }, {
      type: 'separator'
    }, {
      label: 'リロード',
      accelerator: 'Cmd+R',
      click: function(){
        BrowserWindow.getFocusedWindow()?.reload();
      }
    }]
  }
];

function createWindow() {
  // 新規ウィンドウ作成
  mainWindow = new BrowserWindow({ width: 800, height: 600, webPreferences:{
    nodeIntegration: false,
    contextIsolation: false,
    preload: __dirname + '/preload.js'
  }});

  // index.htmlを開く
  mainWindow.loadURL('file://' + __dirname + '/../view/index.html');

  // ウィンドウが閉じられたら、ウィンドウへの参照を破棄する。
  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  const menu = Menu.buildFromTemplate(menuItems);
  Menu.setApplicationMenu(menu);
}

app.on('ready', ()=> {
  createWindow();
});

// すべてのウィンドウが閉じられた際の動作
app.on('window-all-closed', ()=> {
  // OS X では、ウィンドウを閉じても一般的にアプリ終了はしないので除外。
  if (process.platform != 'darwin') {
    mainWindow = null;
    app.quit();
  }
});

app.on('activate', () => {
  // macOSでは、ユーザがドックアイコンをクリックしたとき、
  // そのアプリのウインドウが無かったら再作成するのが一般的です。
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
});

