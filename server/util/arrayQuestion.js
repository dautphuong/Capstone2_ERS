const firebase = require("./firebase_connect");

module.exports = {
    question_array: function(array) {
        var arrResult;
        const arrayPromises = array.map(id => {
            console.log(id);
            return firebase.database().ref("exam-question").child('idQuestion').child(id.idQuestion).on('value', s => s)
          })
          Promise.all(arrayPromises)
          .then(values => {
            console.log(values[0].array);
          })
          .catch(err => {
            console.log("error")
          })
         
    }
}