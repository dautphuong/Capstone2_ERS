const firebase = require("./firebase_connect");

var reportArr = [];
module.exports = {
    snap_array: function (snapshot) {

        snapshot.forEach(function (childSnapshot) {
            firebase.database().ref("questions/" + childSnapshot.val().idQuestion).once("value").then(function (snapshot) {
                var item = childSnapshot.val();
                item.id = childSnapshot.key;
                var question = snapshot.val();
                question.id = snapshot.key;
                item.question = question
                reportArr.push(item);
            });

        });

        return reportArr;
    },

    resetArr: function () {
        reportArr = [];
    }
}