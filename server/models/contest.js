const firebase = require('../util/firebase_connect');
const snapArray = require('../util/snapshot_to_array')
module.exports = class Contest {
    id;
    title;
    timeStart;
    timeEnd;
    idExam; //id by exam

    constructor(title, timeStart, timeEnd, idExam) {
        this.title = title;
        this.timeStart = timeStart;
        this.timeEnd = timeEnd;
        this.idExam = idExam;
    }

    save(req, callback) {
        firebase.database().ref("exams/" + req.idExam).once("value").then(function(snapshot) {
            if (snapshot.exists()) {
            firebase.database().ref("contests/").push().set({
                title: req.title,
                timeStart: req.timeStart,
                timeEnd: req.timeEnd,
                idExam: req.idExam,
                createOnUTC: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
                });
                callback("successfull");
            }else{
                callback("Data exam does not exist");
            }
        });
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
                var arr=[item]
                callback(arr);
            } else {
                callback("Data does not exist");
            }
        });
    }

    update(req, callback) {
        firebase.database().ref("exams/" + req.idExam).once("value").then(function(snapshot) {
            if (snapshot.exists()) {

        firebase.database().ref("contests/" + req.id).once("value").then(function(snapshot) {
            if (snapshot.exists()) {
                firebase.database().ref("contests/" + req.id).update({
                    title: req.title,
                    timeStart: req.timeStart,
                    timeEnd: req.timeEnd,
                    idExam: req.idExam,
                });
                callback("successfull");
            } else {
                callback("Data does not exist");
            }
        });
            }else{
        callback("Data exam does not exist");
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