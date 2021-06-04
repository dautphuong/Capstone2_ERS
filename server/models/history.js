const firebase = require('../util/firebase_connect');
const snapArray = require('../util/snapshot_to_array')
const snapHistory = require('../util/findHistoryContest')

module.exports=class History{
    idUser;
    idExam;// id by Exam
    answer;//array choose question by user
    result;//String
    
    constructor(idContest,idUser,idExam,answer,result){
        this.idContest=idContest,
        this.idUser=idUser,
        this.idExam=idExam,
        this.answer=answer,
        this.result=result
    }

    save(req, callback) {
        firebase.database().ref("exams/" + req.idExam).once("value").then(function(snapshot) {
            if (snapshot.exists()) {
                firebase.database().ref("learners/" + req.idUser).once("value").then(function(snapshot) {
                    if (snapshot.exists()) {
        firebase.database().ref("historys/").push().set({
            idContest:req.idContest,
            idUser: req.idUser,
            idExam: req.idExam,
            answer: req.answer,
            result: req.result,
            createOnUTC: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        });
        callback("successfull");
    }else{
        callback("Data user does not exist");
    }
});
        }else{
            callback("Data exam does not exist");
        }
        });
    }

    findByUser(idUser, callback) {
        firebase.database().ref("historys/").once("value").then(function(snapshot) {
            if (snapshot.exists()) {
                callback(snapHistory.snap_array(snapshot).filter(value => value.idUser == idUser));
            } else {
                callback("Data does not exist");
            }
        });
    }

    findByExam(idExam, callback) {
        firebase.database().ref("historys/").once("value").then(function(snapshot) {
            if (snapshot.exists()) {
                callback(snapArray.snap_array(snapshot).filter(value => value.idExam == idExam));
            } else {
                callback("Data does not exist");
            }
        });
    }

    delete(id, callback) {
        firebase.database().ref("historys/" + id).once("value").then(function(snapshot) {
            if (snapshot.exists()) {
                firebase.database().ref("historys/" + id).remove();
                callback("successfull");
            } else {
                callback("Data does not exist");
            }
        });
    }

    findById(id, callback) {
        firebase.database().ref("historys/" + id).once("value").then(function(snapshot) {
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

    findHistoryByUser(idUser, callback) {
        firebase.database().ref("historys/").once("value").then(function(snapshot) {
            if (snapshot.exists()) {
                callback(snapHistory.snap_array(snapshot).filter(value => value.idUser == idUser));
            } else {
                callback("Data does not exist");
            }
        });
    }
}