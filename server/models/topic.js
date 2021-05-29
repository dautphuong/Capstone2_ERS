const firebase = require('../util/firebase_connect');
const snapArray = require('../util/snapshot_to_array');
const Lesson = require('../models/lesson');
const Question = require('../models/question');

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
            if (snapArray.snap_array(snapshot).some(value => value.id == id) &&( id !=='-Man9lPOf8DMlCC0hAp0')) {

                //delete question by topic
                firebase.database().ref("questions/").once("value").then(function(snapshot) {
                    if (snapshot.exists()) {
                        snapArray.snap_array(snapshot).filter(value => value.idTopic == id).forEach(function(item){
                            const question = new Question();
                question.delete(item.id, function(data) {
    })
                        });
                    } 
                });
                //delete lesson by topic
                firebase.database().ref("lessons/").once("value").then(function(snapshot) {
                    if (snapshot.exists()) {
                        snapArray.snap_array(snapshot).filter(value => value.idTopic == id).forEach(function(item){
                            const lesson = new Lesson();
                            lesson.delete(item.id, function(data) {
                            })
                        });
                    } 
                });
                //delete topic
                firebase.database().ref("topics/" + id).remove();
                callback("Successfully");
            } else {
                callback("Data does not exist");
            }
            
        });
    }
}