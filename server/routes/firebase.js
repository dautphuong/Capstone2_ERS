const router=require('express').Router();
const osaveData=require("../firebase/setData");
const ogetData=require("../firebase/getData");
const oupdateData=require("../firebase/updateData");
const deleteData=require("../firebase/deleteData");

// ----------demo firebase-----------------------------------------
//save firebase 
router.post('/savedata/',function(req,res){
    osaveData.saveData(req.body,function(err,data){
        res.send(data);
    });
});
//get data firebase 
router.get('/userdata/',function(req,res){
    ogetData._getData(function(data){
        res.send({
            "status":"200","statuscode":"1","result":data
        });
    });
});

//update data firebase
router.put("/userdata",function(req,res){
    oupdateData._updateData(req.body,function(data){
        res.send({
            "status":"200","statuscode":"1","message":"Update Successfully"
        })
    })
});

//delete data firebase
router.delete("/userdata/",function(req,res){
    deleteData._deleteData(req.body,function(err,data){
        res.send({
            "status":"200","statuscode":"1","message":"Delete Successfully"
        })
    })
});
// ----------demo firebase--------------------------------------
module.exports=router;