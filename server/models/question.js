const firebase = require('../util/firebase_connect');
const snapArray = require('../util/snapshot_to_array')
const questionArr = require('../util/arrayQuestion')
const docx=require('../util/docx');
module.exports = class Quetion {
    title; //String
    answerChooses; //array
    answerRight; //String
    note; //String
    idTopic; //Topic

    constructor(title, answerChooses, answerRight, note, idTopic) {
        this.title = title;
        this.answerChooses = answerChooses;
        this.answerRight = answerRight;
        this.note = note;
        this.idTopic = idTopic;
    }



    save(req, callback) {
        firebase.database().ref("topics/"+req.idTopic).once("value").then(function(snapshot) {
            if (snapshot.exists()) {
                firebase.database().ref("questions/").push().set({
                    title: req.title,
                    answerChooses: req.answerChooses,
                    answerRight: req.answerRight,
                    idTopic: req.idTopic,
                    note: req.note,
                });
                callback("successfull");
            } else {
                callback("Topic does not exist")
            }
        });
    }

    findAllByTopic(idTopic, callback) {
        firebase.database().ref("topics/" + idTopic).once("value").then(function(snapshot) {
            if (snapshot.exists()) {
                firebase.database().ref("questions/").once("value").then(function(snapshot) {
                    if (snapshot.exists()) {
                        callback(snapArray.snap_array(snapshot).filter(value => value.idTopic == idTopic));
                    } else {
                        callback("Data does not exist");
                    }
                });
            }else{
                callback("Data does not exist");
            }
        });
    }

    findAllByIdExam(idExam, callback) {
        firebase.database().ref("exam-question").orderByChild("idExam").equalTo(idExam).once('value')
        .then(function (snapshot) {
            questionArr.question_array(snapArray.snap_array(snapshot))
            callback(snapArray.snap_array(snapshot));

            // var resultArr=[];
            // snapArray.snap_array(snapshot).forEach(function(item){
            //     questionValue.question_value(item.idQuestion, function(data) {
            //         resultArr.push(data);
            //     })
            // });
            // callback(resultArr);
        });
             
    }

    findAllByIdLesson(idLesson, callback) {
        firebase.database().ref("lesson-question").orderByChild("idLesson").equalTo(idLesson).once('value')
        .then(function (snapshot) {
          callback(snapArray.snap_array(snapshot));
        });                 
    }



    findById(req, callback) {
        firebase.database().ref("questions/" + req).once("value").then(function(snapshot) {
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
        firebase.database().ref("questions/" + req.id).once("value").then(function(snapshot) {
            if (snapshot.exists()) {
                firebase.database().ref("topics/"+req.idTopic).once("value").then(function(snapshot) {
                    if (snapshot.exists()) {
                        firebase.database().ref("questions/" + req.id).update({
                            title: req.title,
                            answerChooses: req.answerChooses,
                            answerRight: req.answerRight,
                            idTopic: req.idTopic,
                            note: req.note,
                        });
                        callback("successfull");
                    } else {
                        callback("Topic does not exist");
                    }
                });
            } else {
                callback("Data does not exist");
            }
        });
    }

    delete(id, callback) {
        firebase.database().ref("questions/" + id).once("value").then(function(snapshot) {
            if (snapshot.exists()) {
                //delete exam question
        firebase.database().ref("exam-question/").once("value").then(function(snapshot) {
            if (snapshot.exists()) {
                snapArray.snap_array(snapshot).filter(value => value.idQuestion == id).forEach(function(item){
                    firebase.database().ref("exam-question/" + item.id).remove();
                });
            } 
        });
           //delete lesson question
           firebase.database().ref("lesson-question/").once("value").then(function(snapshot) {
            if (snapshot.exists()) {
                snapArray.snap_array(snapshot).filter(value => value.idQuestion == id).forEach(function(item){
                    firebase.database().ref("lesson-question/" + item.id).remove();
                });
            } 
        });

                firebase.database().ref("questions/" + id).remove();
                callback("successfull");
            } else {
                callback("Data does not exist");
            }
        });       
    }
    deleteConnect(id,callback){
        firebase.database().ref("exam-question/" + id).once("value").then(function(snapshot) {
            if (snapshot.exists()) {
                firebase.database().ref("exam-question/" + item.id).remove();
                callback("successfull");
            } else {
                firebase.database().ref("lesson-question/" + id).once("value").then(function(snapshot) {
                    if (snapshot.exists()) {
                        firebase.database().ref("lesson-question/" + item.id).remove();
                    }else{
                        callback("Data does not exist");
                    }
                });   
            }
        });
    }

    findAll(callback) {
        firebase.database().ref("questions").once("value").then(function(snapshot) {
            callback(snapArray.snap_array(snapshot));
        })
    }

    // addDataDocx(req,callback){
    //     docx.docx(req);
    // }
}