const router = require('express').Router();
const Exam = require('../models/exam');
const { validationResult } = require('express-validator');
const { validate } = require('../util/validator');
const snapType = require('../util/findAllExam');

/**
 * @swagger
 * components:
 *   schemas:
 *     Exam:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - type
 *         - listQuestion
 *         - timeSet
 *       properties:
 *         id:
 *           type: string
 *           description: the id exam is random
 *         title:
 *           type: string
 *           description: the title exam
 *         type:
 *           type: string
 *           description: exam - practice
 *         listQuestion:
 *           type: array
 *           description: array question
 *         timeSet:
 *           type: int
 *           description: time the exam 
 *       example:
 *         id: random
 *         title: Đề ABC
 *         type: practice
 *         listQuestion: [Q1,Q2,Q3]
 *         timeSet: 900000
 */

/**
 * @swagger
 * tags:
 *   name: Exam
 *   description: The exam managing API
 */

/**
 * @swagger
 * /exam/save:
 *   post:
 *     summary: Tạo một exam mới
 *     tags: [Exam]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Exam'
 *     responses:
 *       200:
 *         description: The Exam was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exam'
 *       500:
 *         description: Some server error
 */
router.post('/save', 
validate.validateExam(),
(req, res) => {
    const exam = new Exam(
        req.body.title,
        req.body.type,
        req.body.timeSet,
        req.body.listQuestion
    );
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        exam.save(exam, function(data) {
            res.send(data)
        });
    } catch (err) {
        res.status(400).send(err);
    }
});


/**
 * @swagger
 * /exam/findByType/{type}:
 *   get:
 *     summary: danh sách exam theo topic
 *     tags: [Exam]
 *     parameters:
 *       - in: path
 *         name: type
 *         schema:
 *           type: string
 *         required: true
 *         description: The type exam 
 *     responses:
 *       200:
 *         description: The questions description by type
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exam'
 *       404:
 *         description: The user was not found
 */
router.get('/findByType/:type', function(req, res) {
    const exam = new Exam();
    exam.findAllByType(req.params.type, function(data) {
        res.send(data)
    })
});

/**
 * @swagger
 * /exam/findById/{id}:
 *   get:
 *     summary: danh sách exam theo topic
 *     tags: [Exam]
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
 *               $ref: '#/components/schemas/Exam'
 *       404:
 *         description: The user was not found
 */
router.get('/findByid/:id', function(req, res) {
    const exam = new Exam();
    exam.findById(req.params.id, function(data) {
        res.send(data)
    })
});

/**
 * @swagger
 * /exam/update:
 *   put:
 *     summary: update thông tin exam
 *     tags: [Exam]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Exam'
 *     responses:
 *       200:
 *         description: The exam was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exam'
 *       500:
 *         description: Some server error
 */
router.put('/update', function(req, res) {
    const exam = new Exam();
    try {
        exam.update(req.body, function(data) {
            res.send(data)
        });
    } catch (err) {
        res.status(400).send(err);
    }
});

/**
 * @swagger
 * /exam/delete/{id}:
 *   delete:
 *     summary: Xóa exam theo id
 *     tags: [Exam]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id exam
 *     responses:
 *       200:
 *         description: The exam was deleted
 *       404:
 *         description: The exam was not found
 */
router.delete("/delete/:id", function(req, res) {
    const exam = new Exam();
    exam.delete(req.params.id, function(data) {
        res.send(data);
    })
});

/**
 * @swagger
 * /exam/updateLQ:
 *   put:
 *     summary: update list question exam
 *     tags: [Exam]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Exam'
 *     responses:
 *       200:
 *         description: The exam was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exam'
 *       500:
 *         description: Some server error
 */
 router.put('/updateLQ', function(req, res) {
    const exam = new Exam();
    try {
        exam.updateListQuestion(req.body, function(data) {
            res.send(data)
        });
    } catch (err) {
        res.status(400).send(err);
    }
});

/**
 * @swagger
 * /exam/findAll:
 *   get:
 *     summary: Danh sách exam
 *     tags: [Exam]
 *     responses:
 *       200:
 *         description: The list of the exam
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Exam'
 */
 router.get('/findAll', function(req, res) {
    const exam = new Exam();
    exam.findAll(function(data) {
        res.send(data)
    })
});


/**
 * @swagger
 * /exam/findExamLesson:
 *   get:
 *     summary: Danh sách exam và lesson có type
 *     tags: [Exam]
 *     responses:
 *       200:
 *         description: The list of the exam
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Exam'
 */
 router.get('/findExamLesson', function(req, res) {
    const exam = new Exam();
    exam.findExamLessonHaveType(function(data) {
        snapType.resetArr();
        res.send(data)
    })
});

/**
 * @swagger
 * /exam/downDoc/{id}:
 *   get:
 *     summary: down FIle
 *     tags: [Exam]
 *     parameters: 
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id
 *     responses:
 *       200:
 *         description: The file by id Exam
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exam'
 *       404:
 *         description: The user was not found
 */
 router.get('/downDoc/:id', function(req, res) {
    const exam = new Exam();
    try {
        exam.downFiles(req.params.id, function(data) {
            res.download(data)
        });
    } catch (err) {
        res.status(400).send(err);
    }
});
module.exports = router;
//ok