const router = require('express').Router();
const Question = require('../models/question');

/**
 * @swagger
 * components:
 *   schemas:
 *     Question:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - answerChooses
 *         - answerRight
 *         - note
 *         - topic
 *         - lesson
 *       properties:
 *         id:
 *           type: string
 *           description: the id question is random
 *         title:
 *           type: string
 *           description: the title question
 *         answerChooses:
 *           type: array
 *           description: the list answer can choose
 *         answerRight:
 *           type: string
 *           description: the answer question is right
 *         note:
 *           type: string
 *           description: the note why right answer
 *         topic:
 *           type: string
 *           description: the id topic question
 *         lesson:
 *           type: string
 *           description: the id lesson //có thể null
 *       example:
 *         id: random
 *         title: Tại sao ...
 *         answerChooses: [chọn A,chọn B,chọn C,chọn D]
 *         answerRight: chọn A
 *         note: vì nó đúng
 *         topic: id topic
 *         lesson: null
 */

/**
 * @swagger
 * tags:
 *   name: Question
 *   description: The question managing API
 */

/**
 * @swagger
 * /question/save:
 *   post:
 *     summary: Tạo một question mới
 *     tags: [Question]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Question'
 *     responses:
 *       200:
 *         description: The Question was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Question'
 *       500:
 *         description: Some server error
 */
router.post('/save', (req, res) => {
    const question = new Question(
        req.body.title,
        req.body.answerChooses,
        req.body.answerRight,
        req.body.note,
        req.body.topic,
        req.body.lesson
    );
    try {
        question.save(question, function(data) {
            res.send(data)
        });
    } catch (err) {
        res.status(400).send(err);
    }
});

/**
 * @swagger
 * /question/findByTopic/{idTopic}:
 *   get:
 *     summary: danh sách question theo topic
 *     tags: [Question]
 *     parameters:
 *       - in: path
 *         name: idTopic
 *         schema:
 *           type: string
 *         required: true
 *         description: The id topic 
 *     responses:
 *       200:
 *         description: The questions description by topic
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Question'
 *       404:
 *         description: The user was not found
 */
router.get('/findByTopic/:topic', function(req, res) {
    const question = new Question();
    question.findAllByTopic(req.params.topic, function(data) {
        res.send(data)
    })
});

/**
 * @swagger
 * /question/findByLesson/{idLesson}:
 *   get:
 *     summary: danh sách question theo lesson
 *     tags: [Question]
 *     parameters:
 *       - in: path
 *         name: idLesson
 *         schema:
 *           type: string
 *         required: true
 *         description: The id Lesson 
 *     responses:
 *       200:
 *         description: The questions description by lesson
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Question'
 *       404:
 *         description: The user was not found
 */
 router.get('/findByLesson/:lesson', function(req, res) {
    const question = new Question();
    question.findAllByLesson(req.params.lesson, function(data) {
        res.send(data)
    })
});

/**
 * @swagger
 * /question/findById/{id}:
 *   get:
 *     summary: question theo id
 *     tags: [Question]
 *     parameters: 
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id
 *     responses:
 *       200:
 *         description: The questions description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Question'
 *       404:
 *         description: The user was not found
 */
router.get('/findByid/:id', function(req, res) {
    const question = new Question();
    question.findById(req.params.id, function(data) {
        res.send(data)
    })
});

/**
 * @swagger
 * /question/update:
 *   put:
 *     summary: update thông tin question
 *     tags: [Question]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Question'
 *     responses:
 *       200:
 *         description: The question was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Question'
 *       500:
 *         description: Some server error
 */
router.put('/update', function(req, res) {
    const question = new Question();
    try {
        question.update(req.body, function(data) {
            res.send(data)
        });
    } catch (err) {
        res.status(400).send(err);
    }
});

/**
 * @swagger
 * /question/delete/{id}:
 *   delete:
 *     summary: Xóa question theo id
 *     tags: [Question]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id question
 *     responses:
 *       200:
 *         description: The question was deleted
 *       404:
 *         description: The question was not found
 */
router.delete("/delete/:id", function(req, res) {
    const question = new Question();
    question.delete(req.params.id, function(data) {
        res.send(data);
    })
});
module.exports = router;