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

    // Loads all the orchids
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

    // Removes an orchid from the database.
    removeOrchid(infoObj) {
        return new Promise((resolve, reject) => {
            this.orchidCollectionDb.remove({ _id:infoObj.id }, {}, (err, numRemoved) => {
                if(err) {
                    reject(err);
                }

                infoObj.pictures.forEach(picture => {
                    fs.unlink(picture, err => {
                        if(err) reject();
                    });
                })

                this.orchidCollectionDb.persistence.compactDatafile();
                resolve();
            });
        });
    }

    // Copies images being "uploaded" to the orchid from their current location
    // to the data/images/ folder. The new files are renamed with the timestamp
    // of creation of the orchid and their index.
    copyOrchidImages(pictures, timestamp) {
        return new Promise((resolve, reject) => {
            // Saves pictures
            const imgFolder = path.join(this.dataFolder, 'images');

            if (!fs.existsSync(imgFolder)) {
                fs.mkdirSync(imgFolder);
            }

            let updatedPaths = [];

            pictures.forEach((filepath, index) => {
                let rstream = fs.createReadStream(filepath);
                rstream.on('error', (err) => {
                    reject(err);
                })   

                // New image uses the timestamp from the object
                // + its index as new path.
                let extension = path.extname(filepath);
                let newPath = path.join(imgFolder,
                                        `${timestamp}_${index}${extension}`
                                        )
                
                updatedPaths.push(newPath);

                let wstream = fs.createWriteStream(newPath);
                wstream.on('error', (err) => {
                    reject(err);
                })
                
                rstream.pipe(wstream);
            });

            resolve(updatedPaths);
        });        
    }

    // Creates a new orchid with the given info.
    // Before creating the orchid entry on the database, it copies the images
    // (if there are any) to data/images/ folder.
    createNewOrchid(orchid_info) {
        return new Promise((resolve, reject) => {
            this.copyOrchidImages(orchid_info.pictures, orchid_info.timestamp)
                .then(paths => {
                // Updating old paths
                orchid_info.pictures = paths;

                this.orchidCollectionDb.insert(orchid_info, (err, newDoc) => {
                    if(err) {
                        console.log(err);
                        reject();
                    }

                    resolve();
                });
            }).catch(err => {
                reject(err);
            });
        });
    }

    // Changes information on an existing orchid.
    // It also deletes any unused picture or copies new pictures if needed.
    editOrchid(orchid_info) {
        return new Promise((resolve, reject) => {
            // Check for unused images
            this.orchidCollectionDb.find({ _id: orchid_info._id }, (err, doc) => {
                let oldPictures = doc[0].pictures;
                let newPictures = orchid_info.pictures;

                let toRemove = oldPictures.filter(picture => !newPictures.includes(picture));
                let toCopy = newPictures.filter(picture => !oldPictures.includes(picture));

                // And the ones that you don't have to do anything about...
                let untouched = newPictures.filter(p => oldPictures.includes(p));
          
                // Remove pictures.
                // They will all be deleted eventually, no need to wait.
                toRemove.forEach(picture => {
                    fs.unlink(picture, err => {
                        if(err) reject();
                    });
                })

                this.copyOrchidImages(toCopy, orchid_info.timestamp).then(copiedPaths => {
                    orchid_info.pictures = untouched.concat(copiedPaths);
                    this.orchidCollectionDb.update({ _id: orchid_info._id }, orchid_info, 
                                                {}, (err, updatedDoc) => {
                        if(err) {
                            reject();
                        }

                        resolve();
                    });
                }).catch(err => {

                });
            });
        });
    }

    // Either saves a new orchid or updates an existing orchid with the
    // upcoming information based on the existence of the _id field.
    saveOrchidToCollection(orchid_info) {
        return new Promise((resolve, reject) => {
            if(orchid_info._id) {
                resolve();
                this.editOrchid(orchid_info).then(() => {
                    resolve('Orchid edited');
                }).catch(err => {
                    reject(err);
                });
            } else {
                this.createNewOrchid(orchid_info).then(() => {
                    resolve('New orchid created');
                }).catch(err => {
                    reject(err);
                });
            }
        });
    }

    // Returns a list of subfamilies.
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
