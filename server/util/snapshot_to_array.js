const firebase = require("./firebase_connect");

var returnArr2=[];

module.exports = {
    snap_array: function(snapshot) {
        var returnArr=[];
        snapshot.forEach(function(childSnapshot) {
            var item = childSnapshot.val();
            item.id = childSnapshot.key;
            returnArr.push(item);
        });

        return returnArr;
    },
    
    snap_arr:  function(snapshot) {

         snapshot.forEach( function(childSnapshot) {
            firebase.database().ref("topics/" + childSnapshot.val().idTopic).once("value").then(function(snapshot) {
                if (snapshot.exists()) {
                    var item = childSnapshot.val();
                    item.id = childSnapshot.key;
                    getNameTopic(item,snapshot.val().name)
                } 
            }); 
        });
        
        return returnArr2;
    },
}

var getNameTopic = (item,nameTopic) => {
    item.nameTopic=nameTopic;
    returnArr2.push(item);
    console.log(returnArr2[0].id)
}