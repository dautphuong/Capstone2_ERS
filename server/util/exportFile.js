const firebase = require("firebase");
var fs = require('fs');
const snapArray = require('./snapshot_to_array');


module.exports = {
    downDoc: function (snapshot,idExam) {
        const file='file/f'+idExam+'.doc'
        if (fs.existsSync(file)) {
            return file;
        }else{
        
        snapshot.forEach(function (childSnapshot) {
            var item = childSnapshot.val();
            firebase.database().ref("questions/" + item.idQuestion).once("value").then(function(snapshot) {
                if (snapshot.exists()) {
                    var item = snapshot.val();
                    let string='Question: '+ item.title+'\n'
                        string+='A. '+item.answerChooses[0]+'\n'
                        string+='B. '+item.answerChooses[1]+'\n'
                        string+='C. '+item.answerChooses[2]+'\n'
                        string+='D. '+item.answerChooses[3]+'\n'
                        fs.appendFile(file, string, function (err) {
                            console.log('ok')
                        });                    
                } 
            });
        });
    }
        return file;
    },
    
}   