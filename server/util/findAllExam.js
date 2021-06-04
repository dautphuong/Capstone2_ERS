const firebase = require("./firebase_connect");
const snapArray = require('./snapshot_to_array')

var examArr=[];
var LessonArr=[];
module.exports = {
    findAllType: function () {
        firebase.database().ref("exams").once("value").then(function(snapshot) {
            examArr=snapArray.snap_array(snapshot);
        })
        firebase.database().ref("lessons").once("value").then(function(snapshot) {
            LessonArr=snapArray.snap_type_lesson(snapshot);
        })

        return (examArr.concat(LessonArr));
    },
    resetArr:function(){
        examArr=[];
        LessonArr=[]
    }
}