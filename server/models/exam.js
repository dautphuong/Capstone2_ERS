const firebase = require('../util/firebase_connect');
const snapArray = require('../util/snapshot_to_array')
module.exports = class Exam {
    title; //String
    type; //Bài tập - Thực hành - Thi
    timeSet; //number(s)
    listQuestion; //list id question 

    constructor(title, type, timeSet, listQuestion) {
        this.title = title;
        this.type = type;
        this.timeSet = timeSet;
        this.listQuestion = listQuestion;
    }

    save(req, callback) {
        firebase.database().ref("exams/").push().set({
            title: req.title,
            type: req.type,
            timeSet: req.timeSet,
            listQuestion: req.listQuestion
                // chưa kiểm tra list question tồn tại không ?
        });
        callback("successfull");
    }

    findAllByType(type, callback) {
        firebase.database().ref("exams/").once("value").then(function(snapshot) {
            if (snapshot.exists()) {
                callback(snapArray.snap_array(snapshot).filter(value => value.type == type));
            } else {
                callback("Data does not exist");
            }
        });
    }


    findById(req, callback) {
        firebase.database().ref("exams/" + req).once("value").then(function(snapshot) {
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
        firebase.database().ref("exams/" + req.id).once("value").then(function(snapshot) {
            if (snapshot.exists()) {
                firebase.database().ref("exams/" + req.id).update({
                    title: req.title,
                    type: req.type,
                    timeSet: req.timeSet,
                    listQuestion: req.listQuestion,
                    // chưa kiểm tra list question tồn tại không ?
                });
                callback("successfull");
            } else {
                callback("Data does not exist");
            }
        });
    }

    delete(id, callback) {
        firebase.database().ref("exams/" + id).once("value").then(function(snapshot) {
            if (snapshot.exists()) {
                firebase.database().ref("exams/" + id).remove();
                callback("successfull");
            } else {
                callback("Data does not exist");
            }
        });
    }
}