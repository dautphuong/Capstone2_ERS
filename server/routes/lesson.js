const router = require('express').Router();
const firebase = require('../util/firebase_connect');
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
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the lesson
 *         title:
 *           type: string
 *           description: The lesson title
 *         blog:
 *           type: string
 *           description: The lesson content
 *       example:
 *         id: test
 *         title: danh từ số ít
 *         blog: abc ....
 */

/**
 * @swagger
 * tags:
 *   name: Lesson
 *   description: The lesson managing API
 */



module.exports = router;