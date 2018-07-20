'use strict';

// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron')

let DbHandler = require('./dbHandler');
const dbHandler = new DbHandler();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// ipc Communication
ipcMain.once('get-orchid-subfamilies', (event, arg) => {
  // Load subfamilies
  dbHandler.getSubfamilies().then((res) => {
    event.sender.send('got-orchid-subfamilies', res);
  }).catch((err) => {
    console.log(err);
  });
})

ipcMain.on('save-orchid', (event, arg) => {
  dbHandler.saveOrchidToCollection(arg).then((res) => {
    event.returnValue = true;
  }).catch((err) => {
    event.returnValue = false;
  });
})

ipcMain.on('load-collection', (event, arg) => {
  dbHandler.loadCollection().then((res) => {
    console.log(res);
    event.returnValue = res;
  }).catch((err) => {
    event.returnValue = {};
  });
})

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // React + Electron
  mainWindow.loadURL('http://localhost:3000');
  
  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.