const router = require('express').Router();
const translate = require('@vitalets/google-translate-api');


/**
 * @swagger
 * components:
 *   schemas:
 *     Translate:
 *       type: object
 *       required:
 *         - content
 *       properties:
 *         content:
 *           type: string
 *           description: content translate       
 *       example:
 *         content: I come from America
 */
 
 /**
 * @swagger
 * tags:
 *   name: Translate
 *   description: The Translate managing API
 */

/**
 * @swagger
 * /translate:
 *   post:
 *     summary: Translate 
 *     tags: [Translate]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Translate'
 *     responses:
 *       200:
 *         description: The Translate was successfully 
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Translate'
 *       500:
 *         description: Some server error
 */
 router.post('/', (req, res) => {
    const data=req.body.content;
    translate(data, {from:'en',to: 'vi'}).then(respone => {
        res.send(respone.text)
        
        console.log(respone.from.language.iso);
    }).catch(err => {
        console.error(err);
    });
});


  module.exports = router;
