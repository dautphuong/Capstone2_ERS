const firebase = require("firebase");

const config = {
    apiKey: "AIzaSyCSPHnqJ20SJ2IUXhLVR-elG1JcaMCNPMg",
    authDomain: "er-system-2b346.firebaseapp.com",
    databaseURL: "https://er-system-2b346-default-rtdb.firebaseio.com",
    projectId: "er-system-2b346",
    storageBucket: "er-system-2b346.appspot.com",
    messagingSenderId: "458386443472",
    appId: "1:458386443472:web:49baf3af040e94613262d5"
};

const app=  firebase.initializeApp(config);

module.exports=app;