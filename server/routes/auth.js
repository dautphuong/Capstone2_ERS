const router=require('express').Router();
const jwt=require('jsonwebtoken');
const User=require('../models/user');
const firebase=require('../util/firebase_connect');

/**
 * @swagger
 * components:
 *   schemas:
 *     Auth:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: the username
 *         email:
 *           type: string
 *           description: the email
 *       example:
 *         username: phuong
 *         email: dautuanphuong@gmail.com
 */

 /**
  * @swagger
  * tags:
  *   name: User
  *   description: The auth managing API
  */

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Create a new account
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Auth'
 *     responses:
 *       200:
 *         description: The account was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Auth'
 *       500:
 *         description: Some server error
 */
router.post('/register',function(req,res){   
    let user = new User(req.body.username,req.body.email);

    firebase.database().ref("users/"+user.username).once("value").then(function(snapshot){
        if (snapshot.exists()) {
            res.send("Account already exists");
          }
          else {
            try{
                firebase.database().ref("users/"+user.username).set({
                    email: user.email, 
                });
                res.status(201).send(user)
            }catch(err){
                res.status(400).res(err);
            }
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