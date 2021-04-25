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
    role; //admin or learner
    lastLogin; //Date


    constructor(username, password, email, role) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = role;
    };

    register(req, callback) {
        firebase.database().ref("users/role_learner/").once("value").then(function(snapshot) {
            if (snapArray.snap_array(snapshot).some(value => value.username == req.username)) {
                callback("Account already exists");
            } else {
                firebase.database().ref("users/role_admin/").once("value").then(function(snapshot) {
                    if (snapArray.snap_array(snapshot).some(value => value.username == req.username)) {
                        callback("Account already exists");
                    } else {
                        firebase.database().ref("users/role_learner/").push().set({
                            username: req.username,
                            password: md5(req.password),
                            email: req.email,
                            avatar: "https://firebasestorage.googleapis.com/v0/b/er-system-2b346.appspot.com/o/avatar.jpg?alt=media&token=0ebb592a-5e15-42d1-8f0f-04998873d251",
                            createOnUTC: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
                            isLessonConfirm: [],
                            role: req.role,
                            lastLogin: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
                        });
                        //callback 
                        firebase.database().ref("users/role_learner/").once("value").then(function(snapshot) {
                            callback(snapArray.snap_array(snapshot).filter(value => value.username == req.username));
                        })
                    }
                })
            }
        });
    }

    createAdmin(req, callback) {
        firebase.database().ref("users/role_learner/").once("value").then(function(snapshot) {
            if (snapArray.snap_array(snapshot).some(value => value.username == req.username)) {
                callback("Account already exists");
            } else {
                firebase.database().ref("users/role_admin/").once("value").then(function(snapshot) {
                    if (snapArray.snap_array(snapshot).some(value => value.username == req.username)) {
                        callback("Account already exists");
                    } else {
                        firebase.database().ref("users/role_admin/").push().set({
                            username: req.username,
                            password: md5(req.password),
                            role: req.role,
                        });
                        //callback 
                        firebase.database().ref("users/role_admin/").once("value").then(function(snapshot) {
                            callback(snapArray.snap_array(snapshot).some(value => value.username == req.username));
                        })
                    }
                })
            }
        });
    }

    findAllUser(callback) {
        firebase.database().ref("users/role_learner").once("value").then(function(snapshot) {
            callback(snapArray.snap_array(snapshot));
        })
    }
    findAllAdmin(callback) {
        firebase.database().ref("users/role_admin").once("value").then(function(snapshot) {
            callback(snapArray.snap_array(snapshot));
        })
    }

    findById(id, callback) {
        firebase.database().ref("users/role_learner/" + id).once("value").then(function(snapshot) {
            if (snapshot.exists()) {
                var item = snapshot.val();
                item.id = snapshot.key;
                var arr=[item];
                callback(arr);
            } else {
                firebase.database().ref("users/role_admin/" + id).once("value").then(function(snapshot) {
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
        firebase.database().ref("users/role_learner/" + req.id).once("value").then(function(snapshot) {
            if (snapshot.exists()) {
                firebase.database().ref("users/role_learner/" + req.id).update({
                    password: req.password,
                    email: req.email,
                    avatar: req.avatar,
                    isLessonConfirm: req.isLessonConfirm,
                    lastLogin: req.lastLogin
                });
                callback("successfull");
            } else {
                firebase.database().ref("users/role_admin/" + req.id).once("value").then(function(snapshot) {
                    if (snapshot.exists()) {
                        firebase.database().ref("users/role_admin/" + req.id).update({
                            password: req.password,
                            email: req.email,
                            lastLogin: req.lastLogin
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
        firebase.database().ref("users/role_learner/" + id).once("value").then(function(snapshot) {
            if (snapshot.exists()) {
                firebase.database().ref("users/role_learner/" + id).remove();
                callback("successfull");
            } else {
                firebase.database().ref("users/role_admin/" + id).once("value").then(function(snapshot) {
                    if (snapshot.exists()) {
                        firebase.database().ref("users/role_admin/" + id).remove();
                        callback("successfull");
                    } else {
                        callback("Data does not exist");
                    }
                });
            }
        });
    }

    checkLogin(req, callback) {
        firebase.database().ref("users/role_learner/" ).once("value").then(function(snapshot) {
            if (snapArray.snap_array(snapshot).some(value => value.username == req.username)) {
                var item = snapArray.snap_array(snapshot).filter(value => value.username == req.username)[0]
                console.log(item)
                console.log(item.password)
                console.log(md5(req.password))
                // if(item.password == md5(req.password)){
                callback(item);
                // }
                // else{
                //     callback(null);
                // }
            }else{
                callback(null);
            }
        });
    }
}