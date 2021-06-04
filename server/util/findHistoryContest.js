const firebase = require("./firebase_connect");

var historyArr=[];
module.exports = {
    snap_array: function (snapshot) {
        
        snapshot.forEach(function (childSnapshot) {
            firebase.database().ref("contests/" + childSnapshot.val().idContest).once("value").then(function(snapshot) {
                    var item = childSnapshot.val();
                    item.id = childSnapshot.key;
                    var contest = snapshot.val();
                    contest.id = snapshot.key;
                    item.contest=contest  
                    historyArr.push(item);            
            });
         
        });

        return historyArr;
    },    
    
    resetArr:function(){
        historyArr=[];
    }
}