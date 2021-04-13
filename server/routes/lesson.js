const router = require('express').Router();
const Lesson = require('../models/lesson');

/**
 * @swagger
 * components:
 *   schemas:
 *     Lesson:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - blog
 *         - topic
 *       properties:
 *         id:
 *           type: string
 *           description: The id create is random
 *         title:
 *           type: string
 *           description: The lesson title
 *         blog:
 *           type: longblog
 *           description: The lesson content
 *         topic:
 *           type: string
 *           description: The  topic lesson
 *       example:
 *         id: L0123
 *         title: danh từ số ít
 *         blog: abc ....
 *         topic: danh từ
 */

/**
 * @swagger
 * tags:
 *   name: Lesson
 *   description: The lesson managing API
 */

/**
 * @swagger
 * /lesson/save:
 *   post:
 *     summary: Tạo một lesson mới
 *     tags: [Lesson]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Lesson'
 *     responses:
 *       200:
 *         description: The Lesson was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lesson'
 *       500:
 *         description: Some server error
 */
router.post('/save', (req, res) => {
    const lesson = new Lesson(
        req.body.title,
        req.body.blog,
        req.body.topic,
    );
    try {
        lesson.save(lesson, function(data) {
            res.send(data)
        });
    } catch (err) {
        res.status(400).send(err);
    }
});

/**
 * @swagger
 * /lesson/findByTopic/{idTopic}:
 *   get:
 *     summary: danh sách lesson theo topic
 *     tags: [Lesson]
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
 *               $ref: '#/components/schemas/Lesson'
 *       404:
 *         description: The user was not found
 */
router.get('/findByTopic/:topic', function(req, res) {
    const lesson = new Lesson();
    lesson.findAllByTopic(req.params.topic, function(data) {
        res.send(data)
    })
});

/**
 * @swagger
 * /lesson/findById/{id}:
 *   get:
 *     summary: danh sách lesson theo topic
 *     tags: [Lesson]
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
 *               $ref: '#/components/schemas/Lesson'
 *       404:
 *         description: The user was not found
 */
router.get('/findByid/:id', function(req, res) {
    const lesson = new Lesson();
    lesson.findById(req.params.id, function(data) {
        res.send(data)
    })
});

/**
 * @swagger
 * /lesson/update:
 *   put:
 *     summary: update thông tin lesson
 *     tags: [Lesson]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Lesson'
 *     responses:
 *       200:
 *         description: The lesson was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lesson'
 *       500:
 *         description: Some server error
 */
router.put('/update', function(req, res) {
    const lesson = new Lesson();
    try {
        lesson.update(req.body, function(data) {
            res.send(data)
        });
    } catch (err) {
        res.status(400).send(err);
    }
});

/**
 * @swagger
 * /lesson/delete/{id}:
 *   delete:
 *     summary: Xóa lesson theo id
 *     tags: [Lesson]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id lesson
 *     responses:
 *       200:
 *         description: The lesson was deleted
 *       404:
 *         description: The lesson was not found
 */
router.delete("/delete/:id", function(req, res) {
    const lesson = new Lesson();
    lesson.delete(req.params.id, function(data) {
        res.send(data);
    })
});

module.exports = router;