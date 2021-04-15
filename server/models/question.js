const firebase = require('../util/firebase_connect');
const snapArray = require('../util/snapshot_to_array')

module.exports = class Quetion {
    title; //String
    answerChooses; //array
    answerRight; //String
    note; //String
    topic; //Topic
    lesson// id lesson

    constructor(title, answerChooses, answerRight, note, topic,lesson) {
        this.title = title;
        this.answerChooses = answerChooses;
        this.answerRight = answerRight;
        this.note = note;
        this.topic = topic;
        this.lesson=lesson;
    }



    save(req, callback) {
        firebase.database().ref("topics/"+req.topic).once("value").then(function(snapshot) {
            if (snapshot.exists()) {
                firebase.database().ref("questions/").push().set({
                    title: req.title,
                    answerChooses: req.answerChooses,
                    answerRight: req.answerRight,
                    topic: req.topic,
                    note: req.note,
                    lesson: req.lesson
                });
                callback("successfull");
            } else {
                callback("Topic does not exist")
            }
        });
    }

    findAllByTopic(topic, callback) {
        firebase.database().ref("topics/" + topic).once("value").then(function(snapshot) {
            if (snapshot.exists()) {
                firebase.database().ref("questions/").once("value").then(function(snapshot) {
                    if (snapshot.exists()) {
                        callback(snapArray.snap_array(snapshot).filter(value => value.topic == topic));
                    } else {
                        callback("Data does not exist");
                    }
                });
            }else{
                callback("Data does not exist");
            }
        });
    }

    findAllByLesson(lesson, callback) {
        firebase.database().ref("lessons/" + lesson).once("value").then(function(snapshot) {
            if (snapshot.exists()) {
                firebase.database().ref("questions/").once("value").then(function(snapshot) {
                    if (snapshot.exists()) {
                        callback(snapArray.snap_array(snapshot).filter(value => value.lesson == lesson));
                    } else {
                        callback("Data does not exist");
                    }
                });
            }else{
                callback("Data does not exist");
            }
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
                firebase.database().ref("topics/").once("value").then(function(snapshot) {
                    if (snapArray.snap_array(snapshot).some(value => value.name == req.topic)) {
                        let topic = snapArray.snap_array(snapshot).find(value => value.name == req.topic).id;
                        firebase.database().ref("questions/" + req.id).update({
                            title: req.title,
                            answerChooses: req.answerChooses,
                            answerRight: req.answerRight,
                            topic: topic,
                            note: req.note,
                            lesson:lesson
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
                firebase.database().ref("questions/" + id).remove();
                callback("successfull");
            } else {
                callback("Data does not exist");
            }
        });
    }
}