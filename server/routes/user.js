const router=require('express').Router();
const User=require('../models/user');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *         - email
 *         - avatar
 *         - createOnUTC
 *         - isLessonConfirm
 *         - role;
 *         - lastLogin
 *       properties:
 *         username:
 *           type: string
 *           description: the username
 *         email:
 *           type: string
 *           description: the email
 *         avatar:
 *           type: string
 *           description: the avatar
 *         createOnUTC:
 *           type: string
 *           description: the time create account
 *         isLessonConfirm:
 *           type: array
 *           description: the array id lesson confirm
 *         role:
 *           type: string
 *           description: admin or learner
 *         lastLogin:
 *           type: date
 *           description: last login by account
 *       example:
 *         username: phuong
 *         password: 12345
 *         email: dau@gmail.com
 *         avatar: avatar.jpg
 *         createOnUTC: 3/4/2021 10:00:00
 *         isLessonConfirm : [Q1,Q2]
 *         role: learner
 *         lastLogin: 3/4/2021 10:00:00
 */

 /**
  * @swagger
  * tags:
  *   name: User
  *   description: The user managing API
  */


/**
 * @swagger
 * /user/findAll:
 *   get:
 *     summary: Danh sách user
 *     tags: [User]
 *     responses:
 *       200:
 *         description: The list of the account
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/findAll/',function(req,res){
    const user=new User();
    user.findAll(function(data){
        res.send(data)
    })
});

/**
 * @swagger
 * /user/findById/{username}:
 *   get:
 *     summary: account theo id
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: The username 
 *     responses:
 *       200:
 *         description: The user description by username
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 */
router.get('/findById/:username',function(req,res){
    const user=new User();
    user.findById(req.params.username,function(data){
        res.send(data)
    })
});


router.put('/update/',function(req,res){
    const user=new User();
    try{
        user.update(req.body,function(data){
            res.send(data)
        });
    }catch(err){
        res.status(400).send(err);
    }
});


/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Remove the book by id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 * 
 *     responses:
 *       200:
 *         description: The book was deleted
 *       404:
 *         description: The book was not found
 */
router.delete("/delete/:username",function(req,res){
    const user=new User();
    user.delete(req.params.username,function(data){
        res.send(data);
    })
});


module.exports=router;