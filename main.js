const { app, BrowserWindow } = require('electron');

const createWindow = () => {
    const win = new BrowserWindow({show: false, icon: "./assets/images/notes.png"});
    win.maximize();
    win.loadFile('index.html');
  };

  app.whenReady().then(() => {
    createWindow();
  });