const router = require('express').Router();
const History = require('../models/history');
const { validationResult } = require('express-validator');
const { validate } = require('../util/validator');
/**
 * @swagger
 * components:
 *   schemas:
 *     History:
 *       type: object
 *       required:
 *         - id
 *         - idUser
 *         - idExam
 *         - answer
 *         - result
 *       properties:
 *         id:
 *           type: string
 *           description: the id history is random
 *         idUser:
 *           type: string
 *           description: the id user
 *         idExam:
 *           type: string
 *           description: the id exam
 *         answer:
 *           type: array
 *           description: array object (question,choose) 
 *         result:
 *           type: string
 *           description: point
 *       example:
 *         id: random
 *         idUser: id User
 *         idExam: id Exam
 *         answer: [{"question":"id question","choose":"answer"},{"question":"id question 3","choose":""},{"question":"id question 3","choose":"answer 3"}]
 *         result: 32/40
 */

/**
 * @swagger
 * tags:
 *   name: History
 *   description: The exam managing API
 */

/**
 * @swagger
 * /history/save:
 *   post:
 *     summary: Tạo một exam mới
 *     tags: [History]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/History'
 *     responses:
 *       200:
 *         description: The history was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/History'
 *       500:
 *         description: Some server error
 */
 router.post('/save',
 validate.validateHistory(),
 (req, res) => {
    const history = new History(
        req.body.idUser,
        req.body.idExam,
        req.body.answer,
        req.body.result
    );
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        history.save(history, function(data) {
            res.send(data)
        });
    } catch (err) {
        res.status(400).send(err);
    }
});

/**
 * @swagger
 * /history/findExamByUser/{idUser}:
 *   get:
 *     summary: danh sách History theo id user
 *     tags: [History]
 *     parameters:
 *       - in: path
 *         name: idUser
 *         schema:
 *           type: string
 *         required: true
 *         description: The id user 
 *     responses:
 *       200:
 *         description: The history description by user
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/History'
 *       404:
 *         description: The user was not found
 */
 router.get('/findExamByUser/:user', function(req, res) {
    const history = new History();
    history.findByUser(req.params.user, function(data) {
        res.send(data)
    })
});

/**
 * @swagger
 * /history/findUserByExam/{idExam}:
 *   get:
 *     summary: danh sách History theo id exam
 *     tags: [History]
 *     parameters:
 *       - in: path
 *         name: idExam
 *         schema:
 *           type: string
 *         required: true
 *         description: The id exam 
 *     responses:
 *       200:
 *         description: The history description by exam
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/History'
 *       404:
 *         description: The user was not found
 */
 router.get('/findUserByExam/:exam', function(req, res) {
    const history = new History();
    history.findByExam(req.params.exam, function(data) {
        res.send(data)
    })
});

/**
 * @swagger
 * /history/delete/{id}:
 *   delete:
 *     summary: Xóa history theo id
 *     tags: [History]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id history
 *     responses:
 *       200:
 *         description: The history was deleted
 *       404:
 *         description: The history was not found
 */
 router.delete("/delete/:id", function(req, res) {
    const history = new History();
    history.delete(req.params.id, function(data) {
        res.send(data);
    })
});


module.exports = router;