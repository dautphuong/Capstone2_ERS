const firebase = require('../util/firebase_connect');
const md5 = require('md5');

module.exports = class User {
    username; //String
    password; //String
    email; //String
    avatar; //auto
    createOnUTC; //Date
    isLessonConfirm; //Array (id lesson user confirm)
    role; //Admin - Learner
    lastLogin; //Date


    constructor(username, password, email, role) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = role;
    };

    register(req, callback) {
        firebase.database().ref("users/role_learner/" + req.username).once("value").then(function(snapshot) {
            if (snapshot.exists()) {
                callback("Account already exists");
            } else {
                firebase.database().ref("users/role_admin/" + req.username).once("value").then(function(snapshot) {
                    if (snapshot.exists()) {
                        callback("Account already exists");
                    } else {
                        firebase.database().ref("users/role_learner/" + req.username).set({
                            username: req.username,
                            password: md5(req.password),
                            email: req.email,
                            avatar: "urlImage",
                            createOnUTC: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
                            isLessonConfirm: [],
                            role: req.role,
                            lastLogin: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
                        });
                        //callback 
                        firebase.database().ref("users/role_learner/" + req.username).once("value").then(function(snapshot) {
                            callback(snapshot.val());
                        })
                    }
                })
            }
        });
    }

    createAdmin(req, callback) {
        firebase.database().ref("users/role_learner/" + req.username).once("value").then(function(snapshot) {
            if (snapshot.exists()) {
                callback("Account already exists");
            } else {
                firebase.database().ref("users/role_admin/" + req.username).once("value").then(function(snapshot) {
                    if (snapshot.exists()) {
                        callback("Account already exists");
                    } else {
                        firebase.database().ref("users/role_admin/" + req.username).set({
                            username: req.username,
                            password: md5(req.password),
                            email: req.email,
                            createOnUTC: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
                            role: req.role,
                            lastLogin: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
                        });
                        //callback 
                        firebase.database().ref("users/role_admin/" + req.username).once("value").then(function(snapshot) {
                            callback(snapshot.val());
                        })
                    }
                })
            }
        });
    }

    findAllUser(callback) {
        firebase.database().ref("users/role_learner").once("value").then(function(snapshot) {
            callback(snapshot.val());
        })
    }
    findAllAdmin(callback) {
        firebase.database().ref("users/role_admin").once("value").then(function(snapshot) {
            callback(snapshot.val());
        })
    }

    findById(id, callback) {
        firebase.database().ref("users/role_learner/" + id).once("value").then(function(snapshot) {
            if (snapshot.exists()) {
                callback(snapshot.val());
            } else {
                firebase.database().ref("users/role_admin/" + id).once("value").then(function(snapshot) {
                    if (snapshot.exists()) {
                        callback(snapshot.val());
                    } else {
                        callback("Data does not exist");
                    }
                });
            }
        });
    }

    updateUser(req, callback) {
        firebase.database().ref("users/role_learner/" + req.username).once("value").then(function(snapshot) {
            if (snapshot.exists()) {
                firebase.database().ref("users/role_learner/" + req.username).update({
                    username: req.username,
                    password: req.password,
                    email: req.email,
                    avatar: req.avatar,
                    isLessonConfirm: req.isLessonConfirm,
                    lastLogin: req.lastLogin
                });
                callback("successfull");
            } else {
                firebase.database().ref("users/role_admin/" + req.username).once("value").then(function(snapshot) {
                    if (snapshot.exists()) {
                        firebase.database().ref("users/role_admin/" + req.username).update({
                            username: req.username,
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


    deleteUser(id, callback) {
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
}