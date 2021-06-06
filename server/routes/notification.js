const router = require('express').Router();
const Notification = require('../models/notification');

/**
 * @swagger
 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       required:
 *         - numQuestion
 *         - numLesson
 *         - numExam
 *         - numContest
 *         - numAccount
 *       properties:
 *         numQuestion:
 *           type: string
 *           description: number question
 *         numLesson:
 *           type: string
 *           description: number lesson
 *         numExam:
 *           type: string
 *           description: number exam
 *         numContest:
 *           type: string
 *           description: number contest
 *         numAccount:
 *           type: string
 *           description: number account
 *       example:
 *         numQuestion: 0
 *         numLesson: 0
 *         numExam: 0
 *         numContest: 0
 *         numAccount: 0
 */

/**
 * @swagger
 * tags:
 *   name: Notification
 *   description: The notification managing API
 */

/**
 * @swagger
 * /notification/getNotification:
 *   get:
 *     summary: Danh sách topic
 *     tags: [Notification]
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
 router.get('/getNotification', function(req, res) {
    const notification = new Notification();
    notification.getNum(
        function(data) {
        res.send(data)
    })
});

module.exports = router;
