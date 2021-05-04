const firebase = require('../util/firebase_connect');
const md5 = require('md5');
const snapArray = require('../util/snapshot_to_array')

module.exports = class User {
    username; //String
    password; //String
    email; //String
    avatar; //auto
    createOnUTC; //Date
    isLessonConfirm; //Array (id lesson user confirm)
    lastLogin; //Date


    constructor(username, password, email,isLessonConfirm) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.isLessonConfirm=isLessonConfirm;
    };

    register(req, callback) {
        firebase.database().ref("learners/").once("value").then(function(snapshot) {
            if (snapArray.snap_array(snapshot).some(value => value.username == req.username)) {
                callback("Account already exists");
            } else {
                firebase.database().ref("admin/").once("value").then(function(snapshot) {
                    if (snapArray.snap_array(snapshot).some(value => value.username == req.username)) {
                        callback("Account already exists");
                    } else {
                        firebase.database().ref("learners/").push().set({
                            username: req.username,
                            password: md5(req.password),
                            email: req.email,
                            avatar: "https://firebasestorage.googleapis.com/v0/b/er-system-2b346.appspot.com/o/avatar.jpg?alt=media&token=0ebb592a-5e15-42d1-8f0f-04998873d251",
                            createOnUTC: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
                            lastLogin: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
                        });
                        callback("Successlly");
                    }
                })
            }
        });
    }

    createAdmin(req, callback) {
        firebase.database().ref("learners/").once("value").then(function(snapshot) {
            if (snapArray.snap_array(snapshot).some(value => value.username == req.username)) {
                callback("Account already exists");
            } else {
                firebase.database().ref("admin/").once("value").then(function(snapshot) {
                    if (snapArray.snap_array(snapshot).some(value => value.username == req.username)) {
                        callback("Account already exists");
                    } else {
                        firebase.database().ref("admin/").push().set({
                            username: req.username,
                            password: md5(req.password),
                        });
                        callback("Successlly");
                    }
                })
            }
        });
    }

    findAllUser(callback) {
        firebase.database().ref("learners").once("value").then(function(snapshot) {
            callback(snapArray.snap_array(snapshot));
        })
    }
    findAllAdmin(callback) {
        firebase.database().ref("admin").once("value").then(function(snapshot) {
            callback(snapArray.snap_array(snapshot));
        })
    }

    findById(id, callback) {
        firebase.database().ref("learners/" + id).once("value").then(function(snapshot) {
            if (snapshot.exists()) {
                var item = snapshot.val();
                item.id = snapshot.key;
                var arr=[item];
                callback(arr);
            } else {
                firebase.database().ref("admin/" + id).once("value").then(function(snapshot) {
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
        });
    }

    updateUser(req, callback) {
        firebase.database().ref("learners/" + req.id).once("value").then(function(snapshot) {
            if (snapshot.exists()) {
                firebase.database().ref("learners/" + req.id).update({
                    password: req.password,
                    email: req.email,
                    avatar: req.avatar,
                    isLessonConfirm: req.isLessonConfirm,
                });
                callback("successfull");
            } else {
                firebase.database().ref("admin/" + req.id).once("value").then(function(snapshot) {
                    if (snapshot.exists()) {
                        firebase.database().ref("admin/" + req.id).update({
                            password: req.password,
                        });
                        callback("successfull");
                    } else {
                        callback("Data does not exist");
                    }
                });
            }
        });
    }


    deleteById(id, callback) {
        firebase.database().ref("learners/" + id).once("value").then(function(snapshot) {
            if (snapshot.exists()) {
            //delete history by user
            firebase.database().ref("historys/").once("value").then(function(snapshot) {
                if (snapshot.exists()) {
                    snapArray.snap_array(snapshot).filter(value => value.idUser == id).forEach(function(item){
                        firebase.database().ref("historys/" + item.id).remove();
                    });
                } 
            });
            callback("successfull");

                firebase.database().ref("learners/" + id).remove();
            } else {
                firebase.database().ref("admin/" + id).once("value").then(function(snapshot) {
                    if (snapshot.exists()) {
                        firebase.database().ref("admin/" + id).remove();
                    } else {
                        callback("Data does not exist");
                    }
                });
            }
            
        });
    }

    logout(req, callback) {
        firebase.database().ref("learners/" + req.id).once("value").then(function(snapshot) {
            if (snapshot.exists()) {
                firebase.database().ref("learners/" + req.id).update({
                    lastLogin: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
                });
                callback(snapshot.val());
            } else {
               callback("Data does not exist");
            }
        });
    }
    
    //chưa check login
    checkLogin(req, callback) {
        firebase.database().ref("learners/" ).once("value").then(function(snapshot) {
            if (snapArray.snap_array(snapshot).some(value => value.username == req.username)) {
                var item = snapArray.snap_array(snapshot).filter(value => value.username == req.username)[0]
                callback(item);
            }else{
                callback(null);
            }
        });
    }
}