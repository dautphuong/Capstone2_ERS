require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const swaggerUI = require('swagger-ui-express');
const swaggerJsdoc = require("swagger-jsdoc");

app.use(bodyParser.json()); //this will accept json request
app.use(bodyParser.urlencoded({ extended: true }));

//Middlewares
app.use(cors());

const swaggerSpec = swaggerJsdoc({
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "APi ENGLISH REIVEW SYSTEM",
        version: "1.0.0",
        description:
          "A sample project to understand how easy it is to document and Express API",
      },
      servers: [{
                    url: "http://localhost:3000",
                }, ],
    },
     components: {
        securitySchemes: {
          jwt: {
            type: "http",
            scheme: "bearer",
            in: "header",
            bearerFormat: "JWT"
          },
        }
      }
      ,
      security: [{
        jwt: []
      }],
    swagger: "2.0",
    apis: ['./routes/*.js'], // files containing annotations as above
  });
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));


//Import Router
const authRouter = require('./routes/auth');
const lessonRouter = require('./routes/lesson');
const userRouter = require('./routes/user');
const topicRouter = require('./routes/topic');
const questionRouter = require('./routes/question');
const examRouter = require('./routes/exam');
const contestRouter = require('./routes/contest');
const historyRouter = require('./routes/history');
const reportRouter = require('./routes/report');

//Router Middlewares
app.use('/user', authRouter);
app.use('/lesson', lessonRouter);
app.use('/user', userRouter);
app.use('/topic', topicRouter);
app.use('/question', questionRouter);
app.use('/exam', examRouter);
app.use('/contest', contestRouter);
app.use('/history', historyRouter);
app.use('/report', reportRouter);


app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});