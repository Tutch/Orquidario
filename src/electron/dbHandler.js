'use strict';

let Store = require('nedb');

class DbHandler {
    constructor() {
        this.orchidInfoDb = new Store({
            filename: './data/orchid_info.db',
            autoload: true
        });
        
        this.orchidCollectionDb = new Store({
            filename: './data/orchid_collection.db',
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
            this.orchidCollectionDb.insert(orchid_info, (err, newDoc) => {
                if(err) {
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
