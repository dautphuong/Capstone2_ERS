const router = require('express').Router();
const Contest = require('../models/contest');

/**
 * @swagger
 * components:
 *   schemas:
 *     Contest:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - timeStart
 *         - timeEnd
 *         - exam
 *       properties:
 *         id:
 *           type: string
 *           description: the id Contest is random
 *         name:
 *           type: string
 *           description: the name Contest
 *         timeStart:
 *           type: string
 *           description: time start do exam
 *         timeEnd:
 *           type: string
 *           description: time end do exam 
 *         exam:
 *           type: string
 *           description: exam id
 *       example:
 *         id: random
 *         name: Cuộc thi abc
 *         timeStart: 2021-04-08 15:00:00
 *         timeEnd: 2021-04-08 17:00:00
 *         exam: E01
 */

/**
 * @swagger
 * tags:
 *   name: Contest
 *   description: The contest managing API
 */

/**
 * @swagger
 * /contest/save:
 *   post:
 *     summary: Tạo một contest mới
 *     tags: [Contest]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contest'
 *     responses:
 *       200:
 *         description: The contest was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contest'
 *       500:
 *         description: Some server error
 */
router.post('/save', (req, res) => {
    const contest = new Contest(
        req.body.name,
        req.body.timeStart,
        req.body.timeEnd,
        req.body.exam
    );
    try {
        contest.save(contest, function(data) {
            res.send(data)
        });
    } catch (err) {
        res.status(400).send(err);
    }
});

/**
 * @swagger
 * /contest/findAll:
 *   get:
 *     summary: Danh sách contest
 *     tags: [Contest]
 *     responses:
 *       200:
 *         description: The list contest
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contest'
 */
router.get('/findAll', function(req, res) {
    const contest = new Contest();
    contest.findAll(function(data) {
        res.send(data)
    })
});


/**
 * @swagger
 * /contest/findById/{id}:
 *   get:
 *     summary: danh sách contest theo topic
 *     tags: [Contest]
 *     parameters: 
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id
 *     responses:
 *       200:
 *         description: The contest description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contest'
 *       404:
 *         description: The user was not found
 */
router.get('/findByid/:id', function(req, res) {
    const contest = new Contest();
    contest.findById(req.params.id, function(data) {
        res.send(data)
    })
});

/**
 * @swagger
 * /contest/update:
 *   put:
 *     summary: update thông tin contest
 *     tags: [Contest]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contest'
 *     responses:
 *       200:
 *         description: The contest was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contest'
 *       500:
 *         description: Some server error
 */
router.put('/update', function(req, res) {
    const contest = new Contest();
    try {
        contest.update(req.body, function(data) {
            res.send(data)
        });
    } catch (err) {
        res.status(400).send(err);
    }
});

/**
 * @swagger
 * /contest/delete/{id}:
 *   delete:
 *     summary: Xóa contest theo id
 *     tags: [Contest]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id contest
 *     responses:
 *       200:
 *         description: The contest was deleted
 *       404:
 *         description: The contest was not found
 */
router.delete("/delete/:id", function(req, res) {
    const contest = new Contest();
    contest.delete(req.params.id, function(data) {
        res.send(data);
    })
});
module.exports = router;