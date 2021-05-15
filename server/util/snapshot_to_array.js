const firebase = require("./firebase_connect");

module.exports = {
    snap_array: function(snapshot) {
        var returnArr = [];

        snapshot.forEach(function(childSnapshot) {
            var item = childSnapshot.val();
            item.id = childSnapshot.key;
            returnArr.push(item);
        });

        return returnArr;
    }
}