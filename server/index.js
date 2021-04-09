require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 4000;
const cors = require("cors");
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require("swagger-jsdoc");

app.use(bodyParser.json()); //this will accept json request
app.use(bodyParser.urlencoded({ extended: true }));

//Middlewares
app.use(cors());

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'APi ENGLISH REIVEW SYSTEM',
            version: '1.0.0',
        },
        servers: [{
            url: "http://localhost:4000",
        }, ],
    },
    apis: ['./routes/*.js'], // files containing annotations as above
};
const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));


//Import Router
const authRouter = require('./routes/auth');
const lessonRouter = require('./routes/lesson');
const userRouter = require('./routes/user');
const topicRouter = require('./routes/topic');
const questionRouter = require('./routes/question');
const examRouter = require('./routes/exam');
const contestRouter = require('./routes/contest');

//Router Middlewares
app.use('/user', authRouter);
app.use('/lesson', lessonRouter);
app.use('/user', userRouter);
app.use('/topic', topicRouter);
app.use('/question', questionRouter);
app.use('/exam', examRouter);
app.use('/contest', contestRouter);

app.listen(port, () => console.log('Server up and running'));