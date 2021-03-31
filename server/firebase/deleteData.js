const firebase = require("../util/firebase_connect");

module.exports={
    _deleteData:function(req,callback){
        let username=req.username;

        firebase.database().ref("users/"+username).remove();
        callback(null,{"statuscode":200,"message":"Inserted successfull"})
    }
}