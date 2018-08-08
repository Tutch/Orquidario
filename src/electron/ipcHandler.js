'use strict';

const {app, ipcMain} = require('electron');
const path = require('path')
const fs = require('fs');

let DbHandler = require('./dbHandler');
const dataFolder = path.join(app.getAppPath(), 'data');
const dbHandler = new DbHandler(dataFolder);

ipcMain.on('get-orchid-subfamilies', (event, arg) => {
    dbHandler.getSubfamilies().then((res) => {
        event.returnValue = res;
    }).catch((err) => {
        event.returnValue = null;
    });
})

ipcMain.on('remove-orchid', (event, id) => {
    dbHandler.removeOrchid(id).then((res) => {
        event.returnValue = true;
    }).catch((err) => {
        event.returnValue = false;
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
        event.returnValue = res;
    }).catch((err) => {
        event.returnValue = {};
    });
})