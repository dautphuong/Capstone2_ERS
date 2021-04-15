const firebase = require('../util/firebase_connect');
const snapArray = require('../util/snapshot_to_array')

module.exports=class Report{
    id;//String auto
    content;//String
    idQuestion;// id by question

    constructor(content,idQuestion){
        this.content=content,
        this.idQuestion=idQuestion
    }

    save(req, callback) {
        firebase.database().ref("questions/"+req.idQuestion).once("value").then(function(snapshot) {
            if (snapshot.exists()) {
                firebase.database().ref("reports/").push().set({
                    idQuestion:req.idQuestion,
                    content:req.content
                });
                callback("successfull");
            } else {
                callback("Question does not exist");
            }
        });
    }

    findAll(callback) {
        firebase.database().ref("reports").once("value").then(function(snapshot) {
            callback(snapArray.snap_array(snapshot));
        })
    }

    findAllByQuestion(idQuestion, callback) {
        firebase.database().ref("reports/").once("value").then(function(snapshot) {
            if (snapshot.exists()) {
                callback(snapArray.snap_array(snapshot).filter(value => value.idQuestion == idQuestion));
            } else {
                callback("Data does not exist");
            }
        });
    }

    findById(req, callback) {
        firebase.database().ref("reports/" + req).once("value").then(function(snapshot) {
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

    delete(id, callback) {
        firebase.database().ref("reports/" + id).once("value").then(function(snapshot) {
            if (snapshot.exists()) {
                firebase.database().ref("reports/" + id).remove();
                callback("successfull");
            } else {
                callback("Data does not exist");
            }
        });
    }
}