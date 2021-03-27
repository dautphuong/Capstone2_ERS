const express = require('express');
const bodyParser=require('body-parser');
const app = express();
const port =3001;
const cors=require("cors");
const swaggerUI=require('swagger-ui-express');
const swaggerJsDoc = require("swagger-jsdoc");


app.use(bodyParser.json());//this will accept json request
app.use(bodyParser.urlencoded({extended:true}));

app.use(cors());

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Hello World',
        version: '1.0.0',
      },
      servers: [
        {
            url: "http://localhost:3001",
        },
        ],
    },
    apis: ['./routes/*.js'], // files containing annotations as above
  };
const specs = swaggerJsDoc(options);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));


//Import Router
const authRouter = require('./routes/auth');
const firebaseRouter = require('./routes/firebase');


//Router Middlewares
app.use('/user',authRouter);
app.use('/',firebaseRouter);



app.listen(port,()=> console.log('Server up and running'));