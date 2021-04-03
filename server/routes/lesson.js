const router=require('express').Router();
const firebase=require('../util/firebase_connect');
const Lesson=require('../models/lesson');

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

/**
 * @swagger
 * /lesson/create:
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
 *         description: The lesson was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lesson'
 *       500:
 *         description: Some server error
 */
router.post('/create',function(req,res){   
    let lesson = new Lesson(req.body.id,req.body.title,req.body.blog);

    firebase.database().ref("lessons/"+lesson.id).once("value").then(function(snapshot){
        if (snapshot.exists()) {
            res.send("Lesson already exists");
          }
          else {
            try{
                firebase.database().ref("lessons/"+lesson.id).set({
                    title: lesson.title, 
                    blog: lesson.blog,
                });
                res.status(201).send(lesson)
            }catch(err){
                res.status(400).res(err);
            }
          }
        });
}); 


/**
 * @swagger
 * /lesson/getAll:
 *   get:
 *     summary: Trả về tất cả các lesson
 *     tags: [Lesson]
 *     responses:
 *       200:
 *         description: The list of the lesson
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Lesson'
 */
router.get("/getAll", (req, res) => {
    firebase.database().ref("users/").once("value").then(function(snapshot){
        res.send(snapshot.val())
    })
});



module.exports=router;