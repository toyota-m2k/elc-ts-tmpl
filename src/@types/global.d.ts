/**
 * preload.ts から使えるよう、windowオブジェクトにプロパティを追加する
 */

// 型のインポート
import { IpcRenderer,App } from 'electron';

// global の名前空間にある定義を上書き
declare global {
  interface Window {
    ipcRenderer: IpcRenderer;
    app: App;
  }
}