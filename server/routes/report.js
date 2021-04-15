const router = require('express').Router();
const Report = require('../models/report');

/**
 * @swagger
 * components:
 *   schemas:
 *     Report:
 *       type: object
 *       required:
 *         - content
 *         - idQuestion
 *       properties:
 *         content:
 *           type: string
 *           description: the content to question
 *         idQuestion:
 *           type: string
 *           description: the id question
 *       example:
 *         content: lỗi đáp án sai
 *         idQuestion: idQuestion
 */

/**
 * @swagger
 * tags:
 *   name: Report
 *   description: The report managing API
 */

/**
 * @swagger
 * /report/save:
 *   post:
 *     summary: Tạo một report mới
 *     tags: [Report]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Report'
 *     responses:
 *       200:
 *         description: The report was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Report'
 *       500:
 *         description: Some server error
 */
 router.post('/save', (req, res) => {
    const report = new Report(
        req.body.content,
        req.body.idQuestion
    );
    try {
        report.save(report, function(data) {
            res.send(data)
        });
    } catch (err) {
        res.status(400).send(err);
    }
});

/**
 * @swagger
 * /report/findAll:
 *   get:
 *     summary: Danh sách report
 *     tags: [Report]
 *     responses:
 *       200:
 *         description: The list of the report
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Report'
 */
 router.get('/findAll', function(req, res) {
    const report = new Report();
    report.findAll(function(data) {
        res.send(data)
    })
});

/**
 * @swagger
 * /report/findByQuestion/{idQuestion}:
 *   get:
 *     summary: danh sách report theo question
 *     tags: [Report]
 *     parameters:
 *       - in: path
 *         name: idQuestion
 *         schema:
 *           type: string
 *         required: true
 *         description: The id question 
 *     responses:
 *       200:
 *         description: The reports description by question
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Report'
 *       404:
 *         description: The user was not found
 */
 router.get('/findByQuestion/:question', function(req, res) {
    const report = new Report();
    report.findAllByQuestion(req.params.question, function(data) {
        res.send(data)
    })
});

/**
 * @swagger
 * /report/findById/{id}:
 *   get:
 *     summary: report theo id
 *     tags: [Report]
 *     parameters: 
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id
 *     responses:
 *       200:
 *         description: The report description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Report'
 *       404:
 *         description: The user was not found
 */
 router.get('/findByid/:id', function(req, res) {
    const report = new Report();
    report.findById(req.params.id, function(data) {
        res.send(data)
    })
});

/**
 * @swagger
 * /report/delete/{id}:
 *   delete:
 *     summary: Xóa report theo id
 *     tags: [Report]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id report
 *     responses:
 *       200:
 *         description: The report was deleted
 *       404:
 *         description: The report was not found
 */
 router.delete("/delete/:id", function(req, res) {
    const report = new Report();
    report.delete(req.params.id, function(data) {
        res.send(data);
    })
});


module.exports = router;