'use strict';

let Store = require('nedb');
let path = require('path');
const fs = require('fs');

class DbHandler {
    constructor(folder) {
        this.dataFolder = folder;

        this.orchidInfoDb = new Store({
            filename:path.join(this.dataFolder, 'orchid_info.db'),
            autoload: true
        });
        
        this.orchidCollectionDb = new Store({
            filename:path.join(this.dataFolder, 'orchid_collection.db'),
            autoload: true
        })
    }

    loadCollection() {
        return new Promise((resolve, reject) => {
            this.orchidCollectionDb.find({}, function (err, docs) {
                if(err) {
                    reject();
                }
                
                resolve(docs);
            });
        });
    }

    saveOrchidToCollection(orchid_info) {
        return new Promise((resolve, reject) => {
            // Saves pictures
            const imgFolder = path.join(this.dataFolder, 'images');

            if (!fs.existsSync(imgFolder)) {
                fs.mkdirSync(imgFolder);
            }

            let updatedPaths = [];

            orchid_info.pictures.forEach((filepath, index) => {
                let rstream = fs.createReadStream(filepath);
                rstream.on('error', (err) => {
                   console.log(err);
                })   

                // New image uses the timestamp from the object
                // + its index as new path.
                let filename = path.basename(filepath);
                let newPath = path.join(imgFolder,
                                          `${orchid_info.timestamp}_${index}`
                                        )
                
                updatedPaths.push(newPath);

                let wstream = fs.createWriteStream(newPath);
                wstream.on('error', (err) => {
                    console.log(err);
                })
                
                rstream.pipe(wstream);
            });        

            // Updating old paths
            orchid_info.pictures = updatedPaths;

            this.orchidCollectionDb.insert(orchid_info, (err, newDoc) => {
                if(err) {
                    console.log(err);
                    reject();
                }

                resolve();
            });
        });
    }

    getSubfamilies() {
        return new Promise((resolve, reject) => {
            this.orchidInfoDb.find({}, function (err, docs) {
                if(err) {
                    reject();
                }

                const subfamilies = docs.map(subfam => subfam.name);            
                resolve(subfamilies);
            });
        });
    }
}

module.exports = DbHandler;
