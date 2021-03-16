const express = require('express');
const bodyParser=require('body-parser');
const app = express();
const port =3000;

app.use(bodyParser.json());//this will accept json request
app.use(bodyParser.urlencoded({extended:true}));


//Import Router
const authRouter = require('./routes/auth');
const firebaseRouter = require('./routes/firebase');


//Router Middlewares
app.use('/user',authRouter);
app.use('/',firebaseRouter);


app.listen(port,()=> console.log('Server up and running'));