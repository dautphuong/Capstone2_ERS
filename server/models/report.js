const firebase = require('../util/firebase_connect');

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
                    idquestion:req.idQuestion,
                    content:req.content
                });
                callback("successfull");
            } else {
                callback("Question does not exist");
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