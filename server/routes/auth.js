const router=require('express').Router();
const jwt=require('jsonwebtoken');
const User=require('../models/user');
const firebase=require('../util/firebase_connect');
const { validationResult } = require('express-validator');
const { validate } = require('../util/validator');

// const validate=require('../util/validator');

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
 *         username: test
 *         email: test@gmail.com
 */

 /**
  * @swagger
  * tags:
  *   name: Auth
  *   description: The auth managing API
  */

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Đắng ký một account mới
 *     tags: [Auth]
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
router.post('/register',
validate.validateRegisterUser(),
(req, res) => {   
    //req validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    firebase.database().ref("users/"+req.body.username).once("value").then(function(snapshot){
        if (snapshot.exists()) {
            res.send("Account already exists");
          }
          else {
            try{
                user.Create(req.body);
                res.send(req.body);
            }catch(err){
                res.status(400).send(err);
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