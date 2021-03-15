const express = require('express');
const bodyParser=require('body-parser');
const app = express();
const port =3000;
const osaveData=require("./firebase/setData");
const ogetData=require("./firebase/getData");
const oupdateData=require("./firebase/updateData");
const deleteData=require("./firebase/deleteData");

// app.use(express.json())
app.use(bodyParser.json());//this will accept json request
app.use(bodyParser.urlencoded({extended:true}));

//Import Router
const authRouter = require('./routes/auth');

//Router Middlewares
app.use('/user',authRouter);



// ----------demo firebase-----------------------------------------
//save firebase 
app.post('/savedata/',function(req,res){
    osaveData.saveData(req.body,function(err,data){
        res.send(data);
    });
});
//get data firebase 
app.get('/userdata/',function(req,res){
    ogetData._getData(function(data){
        res.send({
            "status":"200","statuscode":"1","result":data
        });
    });
});

//update data firebase
app.put("/userdata",function(req,res){
    oupdateData._updateData(req.body,function(data){
        res.send({
            "status":"200","statuscode":"1","message":"Update Successfully"
        })
    })
});

//delete data firebase
app.delete("/userdata/",function(req,res){
    deleteData._deleteData(req.body,function(err,data){
        res.send({
            "status":"200","statuscode":"1","message":"Delete Successfully"
        })
    })
});
// ----------demo firebase--------------------------------------


app.listen(port,()=> console.log('Server up and running'));