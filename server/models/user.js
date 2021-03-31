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


    Create(req){
        firebase.database().ref("users/"+req.username).set({
            email: req.email, 
        });
    }
}

