const router = require('express').Router();
const Question = require('../models/question');
const docx=require('../util/docx');
const snapArray = require('../util/snapshot_to_array')
const { validationResult } = require('express-validator');
const { validate } = require('../util/validator');
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
 *         - idTopic
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
 *         idTopic:
 *           type: string
 *           description: the id topic question
 *       example:
 *         id: random
 *         title: Tại sao ...
 *         answerChooses: [chọn A,chọn B,chọn C,chọn D]
 *         answerRight: chọn A
 *         note: vì nó đúng
 *         idTopic: id topic
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     FILE:
 *       type: object
 *       required:
 *         - url
 *         - idTopic
 *       properties:
 *         url:
 *           type: string
 *           description: the url file in firebase
 *         idTopic:
 *           type: string
 *           description: the id topic
 *       example:
 *         url: link_firebase
 *         idTopic: topicId
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
        req.body.idTopic,
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
 * /question/findAllByIdExam/{idExam}:
 *   get:
 *     summary: danh sách question theo exam
 *     tags: [Question]
 *     parameters:
 *       - in: path
 *         name: idExam
 *         schema:
 *           type: string
 *         required: true
 *         description: The id exam 
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
 router.get('/findAllByIdExam/:idExam', function(req, res) {
    const question = new Question();
    question.findAllByIdExam(req.params.idExam, function(data) {
        res.send(data)
    })
});

/**
 * @swagger
 * /question/findAllByIdLesson/{idLesson}:
 *   get:
 *     summary: danh sách question theo lessson
 *     tags: [Question]
 *     parameters:
 *       - in: path
 *         name: idLesson
 *         schema:
 *           type: string
 *         required: true
 *         description: The id lesson 
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
 router.get('/findAllByIdLesson/:idLesson', function(req, res) {
    const question = new Question();
    question.findAllByIdLesson(req.params.idLesson, function(data) {
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

/**
 * @swagger
 * /question/deleteConnect/{id}:
 *   delete:
 *     summary: Xóa question kết nối với exam or lesson
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
 router.delete("/deleteConnect/:id", function(req, res) {
    const question = new Question();
    question.deleteConnect(req.params.id, function(data) {
        res.send(data);
    })
});

/**
 * @swagger
 * /question/findAll:
 *   get:
 *     summary: Danh sách question
 *     tags: [Question]
 *     responses:
 *       200:
 *         description: The list of the question
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Question'
 */
 router.get('/findAll', function(req, res) {
    const question = new Question();
    question.findAll(function(data) {
        snapArray.resetArr2();
        res.send(data)
    })
});


/**
 * @swagger
 * /question/getFile:
 *   post:
 *     summary: tạo danh sách question file docx
 *     tags: [Question]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FILE'
 *     responses:
 *       200:
 *         description: The list question
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FILE'
 *       500:
 *         description: Some server error
 */
 router.post('/getFile',
 validate.validateFileTopic(),
 (req, res) => {
    try {
        const question = new Question();
        docx.docx(req.body.url,function(dataFile) {
            question.saveListFile(dataFile,req.body.idTopic,function(data) {
                res.send(data)
            });
        });
    } catch (err) {
        res.status(400).send(err);
    }
});

/**
 * @swagger
 * /question/findQuestionByIdExam/{idExam}:
 *   get:
 *     summary: danh sách id question theo exam
 *     tags: [Question]
 *     parameters:
 *       - in: path
 *         name: idExam
 *         schema:
 *           type: string
 *         required: true
 *         description: The id exam 
 *     responses:
 *       200:
 *         description: The questions description by exam
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Question'
 *       404:
 *         description: The user was not found
 */
 router.get('/findQuestionByIdExam/:idExam', function(req, res) {
    const question = new Question();
    question.findQuestionByIdExam(req.params.idExam, function(data) {
        res.send(data)
    })
});

/**
 * @swagger
 * /question/findQuestionByIdLesson/{idLesson}:
 *   get:
 *     summary: danh sách id question theo lesson
 *     tags: [Question]
 *     parameters:
 *       - in: path
 *         name: idLesson
 *         schema:
 *           type: string
 *         required: true
 *         description: The id lesson 
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
 router.get('/findQuestionByIdLesson/:idLesson', function(req, res) {
    const question = new Question();
    question.findQuestionByIdLesson(req.params.idLesson, function(data) {
        res.send(data)
    })
});

module.exports = router;
