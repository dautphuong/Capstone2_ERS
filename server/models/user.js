const firebase=require('../util/firebase_connect');

module.exports=class User{
    username; //String
    password;//String
    email;//String
    avatar;//auto
    createOnUTC;//Date 
    isLessonConfirm;//Array (id lesson user confirm)
    role;//Admin - Learner
    lastLogin;//Date

    constructor(username,email){
        this.username=username;
        this.email=email;
    };

    save(req,callback){
        firebase.database().ref("users/"+req.username).once("value").then(function(snapshot){
            if (snapshot.exists()) {
                callback("Account already exists");
              }
              else {
                    firebase.database().ref("users/"+req.username).set({
                        username: req.username,
                        email: req.email, 
                    });
                    callback(req);
              }
        });
    }

    findAll(callback){
        firebase.database().ref("users/").once("value").then(function(snapshot){
            callback(snapshot.val());
        })
    }

    findById(id,callback){
        firebase.database().ref("users/"+id).once("value").then(function(snapshot){
            if (snapshot.exists()) {
                callback(snapshot.val());
            }
            else{
                callback("Data does not exist"); 
            }
        });
    }
    
    update(req,callback){
         firebase.database().ref("users/"+req.username).once("value").then(function(snapshot){
            if (snapshot.exists()) {
                firebase.database().ref("users/"+req.username+"/").update({
                    username: req.username,
                    email: req.email, 
                 });
                 callback("successfull");
              }
              else {
                callback("Data does not exist"); 
            }
        });
    }

    delete(id,callback){
        firebase.database().ref("users/"+id).once("value").then(function(snapshot){
            if (snapshot.exists()) {
                firebase.database().ref("users/"+id).remove();
                callback("successfull");        
              }
              else {
                callback("Data does not exist"); 
            }
        });
    }
}

