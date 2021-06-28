const firebase = require('../util/firebase_connect');
const snapArray = require('../util/snapshot_to_array');
const snapType = require('../util/findAllExam');
const download=require('../util/exportFile')
var fs = require('fs');

module.exports = class Exam {
    title; //String
    type; //Bài tập - Thực hành - Thi
    timeSet; //number(s)
    listQuestion;

    constructor(title, type, timeSet,listQuestion) {
        this.title = title;
        this.type = type;
        this.timeSet = timeSet;
        this.listQuestion=listQuestion;
    }

    save(req, callback) {
        var reference = firebase.database().ref('exams/').push();
        var uniqueKey = reference.key
        reference.set({
            title: req.title,
            type: req.type,
            timeSet: req.timeSet,
            createOnUTC: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        });
        if(req.listQuestion!=null){

            req.listQuestion.forEach(function(item){
                firebase.database().ref("questions/" + item).once("value").then(function(snapshot) {
                    if (snapshot.exists()) {
        
                firebase.database().ref("exam-question/").push().set({
                    idExam: uniqueKey,
                    idQuestion: item
                });
            }
        });
            });
        }
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
        const file='file/f'+req.id+'.doc'
        if (fs.existsSync(file)) {
            fs.unlinkSync(file)
        }
        firebase.database().ref("exams/" + req.id).once("value").then(function(snapshot) {
            if (snapshot.exists()) {
                firebase.database().ref("exams/" + req.id).update({
                    title: req.title,
                    type: req.type,
                    timeSet: req.timeSet, 
                });
                firebase.database().ref("exam-question/").once("value").then(function(snapshot) {
                    if (snapshot.exists()) {
                        snapArray.snap_array(snapshot).filter(value => value.idExam == req.id).forEach(function(item){
                            firebase.database().ref("exam-question/" + item.id).remove();
                        });
                    } 
                    if(req.listQuestion!=null){
                        req.listQuestion.forEach(function(item){
                            firebase.database().ref("exam-question/").push().set({
                                idExam: req.id,
                                idQuestion: item
                            });
                        });
                        }
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
                //delete contest by exam
                firebase.database().ref("contests/").once("value").then(function(snapshot) {
                    if (snapshot.exists()) {
                        snapArray.snap_array(snapshot).filter(value => value.idExam == id).forEach(function(item){
                            firebase.database().ref("contests/" + item.id).remove();
                        });
                    } 
                });
                //delete history by exam
                firebase.database().ref("historys/").once("value").then(function(snapshot) {
                    if (snapshot.exists()) {
                        snapArray.snap_array(snapshot).filter(value => value.idExam == id).forEach(function(item){
                            firebase.database().ref("historys/" + item.id).remove();
                        });
                    } 
                });
                        //delete exam question
        firebase.database().ref("exam-question/").once("value").then(function(snapshot) {
            if (snapshot.exists()) {
                snapArray.snap_array(snapshot).filter(value => value.idExam == id).forEach(function(item){
                    firebase.database().ref("exam-question/" + item.id).remove();
                });
            } 
        });
                //delete exam
                firebase.database().ref("exams/" + id).remove();
                callback("successfull");
            } else {
                callback("Data does not exist");
            }
        });
    }

    updateListQuestion(req, callback){
        firebase.database().ref("exams/" + req.id).once("value").then(function(snapshot) {
            if (snapshot.exists()) {
                req.listQuestion.forEach(function(item){
                    
                            firebase.database().ref("exam-question/").push().set({
                                idExam: req.id,
                                idQuestion: item
                            });

                });
            }
            callback("ok")
        });
    }

    findAll(callback) {
        firebase.database().ref("exams").once("value").then(function(snapshot) {
            callback(snapArray.snap_array(snapshot));
        })
    }

    findExamLessonHaveType(callback) {
        callback(snapType.findAllType());
    }

    downFiles(idExam, callback) {
        firebase.database().ref("exam-question").orderByChild("idExam").equalTo(idExam).once('value')
        .then(function (snapshot) {
            callback(download.downDoc(snapshot,idExam));
        });
    }
}