const router = require('express').Router();
const Topic = require('../models/topic');
const snapArray = require('../util/snapshot_to_array')
/**
 * @swagger
 * components:
 *   schemas:
 *     Topic:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: the topic
 *       example:
 *         name: danh từ
 */

/**
 * @swagger
 * tags:
 *   name: Topic
 *   description: The topic managing API
 */

/**
 * @swagger
 * /topic/save:
 *   post:
 *     summary: Tạo một topic mới
 *     tags: [Topic]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Topic'
 *     responses:
 *       200:
 *         description: The Topic was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Topic'
 *       500:
 *         description: Some server error
 */
router.post('/save', (req, res) => {
    const topic = new Topic(
        req.body.name
    );
    try {
        topic.save(topic.name, function(data) {
            res.send(data)
        });
    } catch (err) {
        res.status(400).send(err);
    }
});


/**
 * @swagger
 * /topic/findAll:
 *   get:
 *     summary: Danh sách topic
 *     tags: [Topic]
 *     responses:
 *       200:
 *         description: The list topic
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Topic'
 */
router.get('/findAll', function(req, res) {
    const topic = new Topic();
    topic.findAll(function(data) {
        res.send(data)
        console.log(data);

    })
});

/**
 * @swagger
 * /topic/delete/{id}:
 *   delete:
 *     summary: Xóa topic theo id
 *     tags: [Topic]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id topic
 *     responses:
 *       200:
 *         description: The topic was deleted
 *       404:
 *         description: The topic was not found
 */
router.delete("/delete/:id", function(req, res) {
    const topic = new Topic();
    topic.delete(req.params.id, function(data) {
        res.send(data);
    })
});

module.exports = router;