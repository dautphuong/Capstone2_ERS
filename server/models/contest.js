const firebase = require('../util/firebase_connect');
const snapArray = require('../util/snapshot_to_array')
module.exports = class Contest {
    id;
    name;
    timeStart;
    timeEnd;
    exam; //id by exam

    constructor(name, timeStart, timeEnd, exam) {
        this.name = name;
        this.timeStart = timeStart;
        this.timeEnd = timeEnd;
        this.exam = exam;
    }

    save(req, callback) {
        console.log(req)
        firebase.database().ref("contests/").push().set({
            name: req.name,
            timeStart: req.timeStart,
            timeEnd: req.timeEnd,
            exam: req.exam
        });
        callback("successfull");
    }

    findAll(callback) {
        firebase.database().ref("contests/").once("value").then(function(snapshot) {
            callback(snapArray.snap_array(snapshot));
        })
    }

    findById(req, callback) {
        firebase.database().ref("contests/" + req).once("value").then(function(snapshot) {
            if (snapshot.exists()) {
                var item = snapshot.val();
                item.id = snapshot.key;
                callback(item);
            } else {
                callback("Data does not exist");
            }
        });
    }

    update(req, callback) {
        firebase.database().ref("contests/" + req.id).once("value").then(function(snapshot) {
            if (snapshot.exists()) {
                firebase.database().ref("contests/" + req.id).update({
                    name: req.name,
                    timeStart: req.timeStart,
                    timeEnd: req.timeEnd,
                    exam: req.exam,
                });
                callback("successfull");
            } else {
                callback("Data does not exist");
            }
        });
    }

    delete(id, callback) {
        firebase.database().ref("contests/" + id).once("value").then(function(snapshot) {
            if (snapshot.exists()) {
                firebase.database().ref("contests/" + id).remove();
                callback("successfull");
            } else {
                callback("Data does not exist");
            }
        });
    }
}