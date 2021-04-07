user 
    admin
        username; 
        password;
        createOnUTC;
        lastLogin;
    learner
        username; 
        password;
        email;
        avatar;
        createOnUTC;
        isLessonConfirm;
        lastLogin;
//-------------------------------------------//
topic
    name 
//-------------------------------------------//
question
    topic//name topic
        id;
        name;
        answerChooses;
        answerRight;
        note;
//-------------------------------------------//
report
    idQuestion//id question
        id;
        content;
//-------------------------------------------//
lesson    
    topic//name topic
        id;
        title;
        blog;
        listQuestion;
//-------------------------------------------//
history
    idUser// username
        id;
        idExam;
        answer;
        point;
//-------------------------------------------//
exam
    type// thực hành or thi    
        id;
        name;
        timeSet;
        listQuestion;
 //-------------------------------------------//
 contest 
    id;
    name;
    timeStart;
    timeEnd;
    exam;