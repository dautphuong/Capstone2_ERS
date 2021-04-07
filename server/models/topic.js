const firebase = require('../util/firebase_connect');

module.exports = class Topic {
    id;
    name; //String

    constructor(name) {
        this.name = name;
    };

    save(req, callback) {
        const id = 'T' + Math.floor(Math.random() * 10000) + 1 + Math.floor(Math.random() * 10000) + 1 + Math.floor(Math.random() * 10000) + 1;;
        firebase.database().ref("topic/" + id).once("value").then(function(snapshot) {
            if (snapshot.exists()) {
                callback("Account already exists");
            } else {
                firebase.database().ref("topic/" + id).set({
                    id: id,
                    name: req,
                });
                callback("successfull");
            }
        });
    }

    findAll(callback) {
        firebase.database().ref("topic/").once("value").then(function(snapshot) {
            callback(snapshot.val());
        })
    }

    delete(id, callback) {
        firebase.database().ref("topic/" + id).once("value").then(function(snapshot) {
            if (snapshot.exists()) {
                firebase.database().ref("topic/" + id).remove();
                callback("successfull");
            } else {
                callback("Data does not exist");
            }
        });
    }
}