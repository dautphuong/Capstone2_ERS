const firebase = require('../util/firebase_connect');

const notification={
    numQuestion:0,
    numLesson:0,
    numExam:0,
    numContest:0,
    numAccount:0,
    numReport:0
}


module.exports = class Notification {
    

    async getNum(callback){
        firebase.database().ref("questions/").on("value", function(snapshot) {
            notification.numQuestion=snapshot.numChildren();
          })
          firebase.database().ref("learners/").on("value", function(snapshot) {
            notification.numAccount=snapshot.numChildren();
          })
          firebase.database().ref("lessons/").on("value", function(snapshot) {
            notification.numLesson=snapshot.numChildren();
          })
          firebase.database().ref("exams/").on("value", function(snapshot) {
            notification.numExam=snapshot.numChildren();
          })
          firebase.database().ref("contests/").on("value", function(snapshot) {
            notification.numContest=snapshot.numChildren();
          })
          firebase.database().ref("reports/").on("value", function(snapshot) {
            notification.numReport=snapshot.numChildren();
          })
          await callback(notification);
    }
}