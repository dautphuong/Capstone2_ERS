const firebase = require("./firebase_connect");
var returnArr2=[];
var returnArr3=[];

module.exports = {
    snap_array: function (snapshot) {
        var returnArr = [];

        snapshot.forEach(function (childSnapshot) {
            var item = childSnapshot.val();
            item.id = childSnapshot.key;
            returnArr.push(item);
        });

        return returnArr;
    },
    snap_arr: function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            firebase.database().ref("topics/" + childSnapshot.val().idTopic).once("value").then(function (snapshot) {
                if (snapshot.exists()) {
                    var item = childSnapshot.val();
                    item.id = childSnapshot.key;
                    getNameTopic(item, snapshot.val().name)
                }
            });
        });

        return returnArr2;
    },

    snap_arrQ: function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            firebase.database().ref("topics/" + childSnapshot.val().idTopic).once("value").then(function (snapshot) {
                if (snapshot.exists()) {
                    var item = childSnapshot.val();
                    item.id = childSnapshot.key;
                    getNameTopicQ(item, snapshot.val().name)
                }
            });
        });

        return returnArr3;
    },
    snap_arrQuestionbyExam: function (snapshot) {
        var questionArr = [];

        snapshot.forEach(function (childSnapshot) {
            var item = childSnapshot.val();
            questionArr.push(item.idQuestion);
        });

        return questionArr;
    },
    snap_type_lesson: function (snapshot) {
        var lessonArr = [];

        snapshot.forEach(function (childSnapshot) {
            var item = childSnapshot.val();
            item.id = childSnapshot.key;
            item.type='lesson';
            lessonArr.push(item);
        });

        return lessonArr;
    },
    resetArr:function(){
        returnArr2=[];
    },
    resetArr2:function(){
        returnArr3=[];
    }
    
}
var getNameTopicQ = (item, nameTopic) => {
    item.nameTopic = nameTopic;
    returnArr3.push(item);
    console.log(returnArr3[0].id)
}
var getNameTopic = (item, nameTopic) => {
    item.nameTopic = nameTopic;
    returnArr2.push(item);
    console.log(returnArr2[0].id)
}

