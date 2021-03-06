const router = require('express').Router();
const User = require('../models/user');

/**
 * @swagger
 * components:
 *   schemas:
 *     UserCreate:
 *       type: object
 *       required:
 *         - username
 *         - password
 *         - email
 *         - role;
 *       properties:
 *         username:
 *           type: string
 *           description: the username
 *         password:
 *           type: string
 *           description: the username
 *         email:
 *           type: string
 *           description: the email
 *         role:
 *           type: string
 *           description: admin or learner
 *       example:
 *         username: phuong
 *         password: ad1234
 *         email: dau@gmail.com
 *         role: learner
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - id
 *         - username
 *         - password
 *         - email
 *         - role
 *         - avatar
 *         - isLessonConfirm
 *         - lastLogin
 *       properties:
 *         id:
 *           type: string
 *           description: the id random
 *         username:
 *           type: string
 *           description: the username
 *         password:
 *           type: string
 *           description: the username
 *         email:
 *           type: string
 *           description: the email
 *         role:
 *           type: string
 *           description: admin - learner
 *         avatar:
 *           type: string
 *           description: admin or learner
 *         isLessonConfirm:
 *           type: array
 *           description: list id lesson confirm
 *         lastLogin:
 *           type: string
 *           description: date time last login
 *       example:
 *         id: random
 *         username: phuong
 *         password: ad1234
 *         role: learner
 *         email: dau@gmail.com
 *         avatar: urlImage
 *         isLessonConfirm: [Q1,Q2]
 *         lastLogin: 2021-04-07 06:25:45
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: The user managing API
 */

/**
 * @swagger
 * /user/save:
 *   post:
 *     summary: T???o m???t ng?????i d??ng m???i
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreate'
 *     responses:
 *       200:
 *         description: The account was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserCreate'
 *       500:
 *         description: Some server error
 */
router.post('/save', (req, res) => {
    const user = new User(
        req.body.username,
        req.body.password,
        req.body.email,
    );
    try {
        if (req.body.role == 'learner') {
            user.register(user, function(data) {
                res.send(data)
            });
        } else {
            user.createAdmin(user, function(data) {
                res.send(data)
            });
        }
    } catch (err) {
        res.status(400).send(err);
    }
});


/**
 * @swagger
 * /user/findAllUser:
 *   get:
 *     summary: Danh s??ch learner
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
router.get('/findAllUser', function(req, res) {
    const user = new User();
    user.findAllUser(function(data) {
        res.send(data)
    })
});

/**
 * @swagger
 * /user/findAllAdmin:
 *   get:
 *     summary: Danh s??ch admin
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
router.get('/findAllAdmin', function(req, res) {
    const user = new User();
    user.findAllAdmin(function(data) {
        res.send(data)
    })
});

/**
 * @swagger
 * /user/findById/{id}:
 *   get:
 *     summary: th??ng tin ng?????i d??ng b???ng username
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id 
 *     responses:
 *       200:
 *         description: The user description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 */
router.get('/findById/:id', function(req, res) {
    const user = new User();
    user.findById(req.params.id, function(data) {
        res.send(data)
    })
});


/**
 * @swagger
 * /user/updatePassword:
 *   put:
 *     summary: update th??ng tin user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The password update successfully 
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
router.put('/updatePassword', function(req, res) {
    const user = new User();
    try {
        user.updatePassword(req.body, function(data) {
            res.send(data)
        });

    } catch (err) {
        res.status(400).send(err);
    }
});


/**
 * @swagger
 * /user/delete/{id}:
 *   delete:
 *     summary: X??a ng?????i d??ng
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user was deleted
 *       404:
 *         description: The user was not found
 */
router.delete("/delete/:id", function(req, res) {
    const user = new User();
    user.deleteById(req.params.id, function(data) {
        res.send(data);
    })
});

/**
 * @swagger
 * /user/updateEmail:
 *   put:
 *     summary: update th??ng tin user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The email update successfully 
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
 router.put('/updateEmail', function(req, res) {
    const user = new User();
    try {
        user.updateEmail(req.body, function(data) {
            res.send(data)
        });

    } catch (err) {
        res.status(400).send(err);
    }
});

/**
 * @swagger
 * /user/updateAvatar:
 *   put:
 *     summary: update th??ng tin user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The avatar update successfully 
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
 router.put('/updateAvatar', function(req, res) {
    const user = new User();
    try {
        user.updateAvatar(req.body, function(data) {
            res.send(data)
        });

    } catch (err) {
        res.status(400).send(err);
    }
});
module.exports = router;
//ok