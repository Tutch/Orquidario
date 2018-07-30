'use strict';

const {app, ipcMain} = require('electron');
const path = require('path')
const fs = require('fs');

let DbHandler = require('./dbHandler');
const dataFolder = path.join(app.getAppPath(), 'data');
const dbHandler = new DbHandler(dataFolder);

ipcMain.once('get-orchid-subfamilies', (event, arg) => {
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
        event.returnValue = res;
    }).catch((err) => {
        event.returnValue = {};
    });
})

/*ipcMain.on('upload-files', (event, filePaths) => {
    const imgFolder = path.join(dataFolder, 'images');

    if (!fs.existsSync(imgFolder)) {
        fs.mkdirSync(imgFolder);
    }

    filePaths.forEach(filepath => {
        console.log(filepath);
        let rstream = fs.createReadStream(filepath);
        rstream.on('error', (err) => {
            event.returnValue = false;
        })   

        let filename = path.basename(filepath);
        let wstream = fs.createWriteStream(path.join(imgFolder, filename));
        wstream.on('error', (err) => {
            event.returnValue = false;
        })
        
        rstream.pipe(wstream);
        event.returnValue = true;
    });
});*/
