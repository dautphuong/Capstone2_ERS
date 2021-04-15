const firebase = require('../util/firebase_connect');
const snapArray = require('../util/snapshot_to_array')

module.exports = class Lesson {
    title; //String
    blog; //String
    topic; //id Topic
    listQuestion; //list id question 
    constructor(title, blog, topic) {
        this.title = title;
        this.blog = blog;
        this.topic = topic;
    }

    save(req, callback) {
        firebase.database().ref("topics/").once("value").then(function(snapshot) {
            if (snapArray.snap_array(snapshot).some(value => value.name == req.topic)) {
                let topic = snapArray.snap_array(snapshot).find(value => value.name == req.topic).id;
                firebase.database().ref("lessons/").push().set({
                    title: req.title,
                    blog: req.blog,
                    topic: topic
                });
                callback("successfull");
            } else {
                callback("Topic does not exist")
                    // chưa xử lý tự động thêm topic dc
            }
        });
    }

    findAllByTopic(topic, callback) {
        firebase.database().ref("topics/" + topic).once("value").then(function(snapshot) {
            if (snapshot.exists()) {
                firebase.database().ref("lessons/").once("value").then(function(snapshot) {
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
                firebase.database().ref("topics/").once("value").then(function(snapshot) {
                    if (snapArray.snap_array(snapshot).some(value => value.name == req.topic)) {
                        let topic = snapArray.snap_array(snapshot).find(value => value.name == req.topic).id;
                        firebase.database().ref("lessons/" + req.id).update({
                            title: req.title,
                            blog: req.blog,
                            topic: topic,
                            // chưa kiểm tra list question tồn tại không ?
                        });
                        callback("successfull");
                    } else {
                        callback("Topic does not exist");
                        // chưa xử lý tự động thêm topic dc
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