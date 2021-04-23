const firebase = require('../util/firebase_connect');
const snapArray = require('../util/snapshot_to_array')
module.exports = class Topic {
    name; //String

    constructor(name) {
        this.name = name;
    };

    save(req, callback) {
        firebase.database().ref("topics/").once("value").then(function(snapshot) {
            if (snapArray.snap_array(snapshot).some(value => value.name == req)) {
                callback("Account already exists");
            } else {
                firebase.database().ref("topics/").push().set({
                    name: req,
                });
                callback("Successful");
            }
        });
    }

    findAll(callback) {
        firebase.database().ref("topics/").once("value").then(function(snapshot) {
            callback(snapArray.snap_array(snapshot));
        })
    }

    delete(id, callback) {
        firebase.database().ref("topics/").once("value").then(function(snapshot) {
            if (snapArray.snap_array(snapshot).some(value => value.id == id)) {
                firebase.database().ref("topics/" + id).remove();
                callback("successfull");
            } else {
                callback("Data does not exist");
            }
        });
    }
}