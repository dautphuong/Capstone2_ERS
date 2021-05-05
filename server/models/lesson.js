const firebase = require('../util/firebase_connect');
const snapArray = require('../util/snapshot_to_array')

module.exports = class Lesson {

    constructor(title, content, idTopic,listQuestion) {
        this.title = title;
        this.content = content;
        this.idTopic = idTopic;
        this.listQuestion=listQuestion;
    }

    save(req, callback) {
        

        firebase.database().ref("topics/"+req.idTopic).once("value").then(function(snapshot) {
            if (snapshot.exists()) {
                // firebase.database().ref("lessons/").push().set({
                //     title: req.title,
                //     content: req.content,
                //     idTopic: req.idTopic,
                //     createOnUTC: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
                // });
                
                var reference = firebase.database().ref('lessons/').push();
        var uniqueKey = reference.key
        reference.set({
            title: req.title,
                    content: req.content,
                    idTopic: req.idTopic,
                    createOnUTC: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        });
        if(req.listQuestion!=null){
        req.listQuestion.forEach(function(item){
            firebase.database().ref("lesson-question/").push().set({
                idLesson: uniqueKey,
                idQuestion: item
            });
        });
    }

        callback("successfull");
            } else {
                callback("Topic does not exist")
            }
        });
    }

    findAllByTopic(idTopic, callback) {
        firebase.database().ref("topics/" + idTopic).once("value").then(function(snapshot) {
            if (snapshot.exists()) {
                firebase.database().ref("lessons/").once("value").then(function(snapshot) {
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

    findById(req, callback) {
        firebase.database().ref("lessons/" + req).once("value").then(function(snapshot) {
            if (snapshot.exists()) {
                var item = snapshot.val();
                item.id = snapshot.key;
                var arr=[item];
                callback(arr);
            } else {
                callback("Data does not exist");
            }
        });
    }

    update(req, callback) {
        firebase.database().ref("lessons/" + req.id).once("value").then(function(snapshot) {
            if (snapshot.exists()) {
                firebase.database().ref("topics/"+req.idTopic).once("value").then(function(snapshot) {
                    if (snapshot.exists()) {
                        firebase.database().ref("lessons/" + req.id).update({
                            title: req.title,
                            content: req.content,
                            idTopic: req.idTopic,
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
        firebase.database().ref("lessons/" + id).once("value").then(function(snapshot) {
            if (snapshot.exists()) {
                firebase.database().ref("lessons/" + id).remove();
                callback("successfull");
            } else {
                callback("Data does not exist");
            }
        });
    }
}