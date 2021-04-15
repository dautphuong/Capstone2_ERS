const firebase = require('../util/firebase_connect');
const snapArray = require('../util/snapshot_to_array')

module.exports=class History{
    idUser;
    idExam;// id by Exam
    answer;//array choose question by user
    result;//String
    
    constructor(idUser,idExam,answer,result){
        this.idUser=idUser,
        this.idExam=idExam,
        this.answer=answer,
        this.result=result
    }

    save(req, callback) {
        console.log(req);
        firebase.database().ref("history/").push().set({
            idUser: req.idUser,
            idExam: req.idExam,
            answer: req.answer,
            result: req.result,
        });
        callback("successfull");
        // chưa kiểm tra tồn tại id user,exam
    }

    findByUser(idUser, callback) {
        firebase.database().ref("history/").once("value").then(function(snapshot) {
            if (snapshot.exists()) {
                callback(snapArray.snap_array(snapshot).filter(value => value.idUser == idUser));
            } else {
                callback("Data does not exist");
            }
        });
    }

    findByExam(idExam, callback) {
        firebase.database().ref("history/").once("value").then(function(snapshot) {
            if (snapshot.exists()) {
                callback(snapArray.snap_array(snapshot).filter(value => value.idExam == idExam));
            } else {
                callback("Data does not exist");
            }
        });
    }

    delete(id, callback) {
        firebase.database().ref("history/" + id).once("value").then(function(snapshot) {
            if (snapshot.exists()) {
                firebase.database().ref("history/" + id).remove();
                callback("successfull");
            } else {
                callback("Data does not exist");
            }
        });
    }
}