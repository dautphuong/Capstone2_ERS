const router=require('express').Router();
const jwt=require('jsonwebtoken');
const User=require('../models/user');
const firebase=require('../firebase/firebase_connect');

router.post('/register/',function(req,res){   
    let user = new User(req.body.username,req.body.email);

    firebase.database().ref("users/"+req.username).once("value").then(function(snapshot){
        if (snapshot.exists()) {
            try{
                firebase.database().ref("users/"+user.username).set({
                    email: user.email, 
                });
                res.send(user)
            }catch(err){
                res.status(400).res(err);
            }
          }
          else {
            res.send("Account already exists");
          }
        });
}); 


router.post('/login',(req,res)=>{
    const username=req.body.username
    const user ={name:username}
    const accessToken=jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken:accessToken})
})

module.exports=router;