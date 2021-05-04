const router=require('express').Router();
const jwt=require('jsonwebtoken');
const User=require('../models/user');
const { validationResult } = require('express-validator');
const { validate } = require('../util/validator');

const {verifyToken}=require('../util/authorization')

/**
 * @swagger
 * components:
 *   schemas:
 *     Auth:
 *       type: object
 *       required:
 *         - username
 *         - password
 *         - email
 *       properties:
 *         username:
 *           type: string
 *           description: the username
 *         password:
 *           type: string
 *           description: the password
 *         email:
 *           type: string
 *           description: the email
 *       example:
 *         username: dauphuong
 *         password: phuong123
 *         email: dauphuong@gmail.com
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AuthLogout:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: string
 *           description: the id user
 *       example:
 *         id: nhapId
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AuthLogin:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: the username user
 *         password:
 *           type: string
 *           description: the password user
 *       example:
 *         username: dauphuong
 *         password: phuong123
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
 *     summary: Đăng ký một account mới
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
    const user=new User(
        req.body.username,
        req.body.password,
        req.body.email,
    );
    //req validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try{
        user.register(user,function(data){
            res.send(data)
            console.log(data)
        });
    }catch(err){
        res.status(400).send(err);
    }
}); 

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthLogin'
 *     responses:
 *       200:
 *         description: login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthLogin'
 *       500:
 *         description: Some server error
 */
router.post('/login',(req,res)=>{
    const user =new User();
    user.checkLogin(req.body,function(data){
        if(data!=null){
        jwt.sign({data}, 'secretkey', { expiresIn: '2 days' }, (err, token) => {
            const id=data.id
            res.send({
                id,
                token
            });
          });
        }else{
            res.send("Data does not exist")
        }
    })
    
})

/**
 * @swagger
 * /user/logout:
 *   put:
 *     summary: logout
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthLogout'
 *     responses:
 *       200:
 *         description: logout
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthLogout'
 *       500:
 *         description: Some server error
 */
router.put('/logout', function(req, res) {
    const user = new User();
    try {
        user.logout(req.body, function(data) {
            res.send(data)
        });
    } catch (err) {
        res.status(400).send(err);
    }
});


// router.post('/api/posts', verifyToken , (req, res) => {  
//     jwt.verify(req.token, 'secretkey', (err, authData) => {
//       if(err) {
//         res.sendStatus(403);
//       } else {
//         res.json({
//           message: 'Post created...',
//           authData
//         });
//       }
//     });
//   });

module.exports=router;
//ok