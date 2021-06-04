const { check } = require('express-validator');

let validateRegisterUser = () => {
    return [ 
      check('username').not().isEmpty().withMessage('username does not Empty'),
      check('password').not().isEmpty().withMessage('password does not Empty'),
      check('email').not().isEmpty().withMessage('email does not Empty'),

      // check('username', 'username must be Alphanumeric').isAlphanumeric(),
      // check('username', 'username more than 6 degits').isLength({ min: 6 }),
      // check('email', 'Invalid does not Empty').not().isEmpty(),
      // check('email', 'Invalid email').matches(/^([a-z]|[0-9])([a-z0-9-_.]){2,}@[a-z0-9-.]+\.[a-z]{2,}$/g),
      // check('email','Invalid email').matches(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-||_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+([a-z]+|\d|-|\.{0,1}|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])?([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/g),
      // check('password', 'password more than 6 degits').isLength({ min: 6 })
    ]; 
  }

  let validateLesson=()=>{
    return[
      check('idTopic').not().isEmpty().withMessage('topic does not Empty'),
      check('content').not().isEmpty().withMessage('content does not Empty'),
      check('title').not().isEmpty().withMessage('title does not Empty'),
    ]
  }

  let validateExam=()=>{
    return[
      check('type', 'Invalid type').matches(/[practice|exam]/),
      check('timeSet').not().isEmpty().withMessage('time set does not Empty'),
      check('title').not().isEmpty().withMessage('title does not Empty'),
    ]
  }
  let validateHistory=()=>{
    return[
      check('idUser').not().isEmpty().withMessage('id user does not Empty'),
      check('idExam').not().isEmpty().withMessage('id Exam does not Empty'),
      check('result').not().isEmpty().withMessage('result does not Empty'),
    ]
  }
  let validateContest=()=>{
    return[
      check('timeStart').not().isEmpty().withMessage('timeStart does not Empty'),
      check('title').not().isEmpty().withMessage('title does not Empty'),
      check('timeEnd').not().isEmpty().withMessage('timeEnd does not Empty'),
      check('idExam').not().isEmpty().withMessage('id Exam does not Empty'),

    ]
  }
  let validateFileTopic=()=>{
    return[
      check('idTopic').not().isEmpty().withMessage('id topic does not Empty'),
      check('url').not().isEmpty().withMessage('url does not Empty'),
    ]
  }

  let validate = {
    validateRegisterUser:validateRegisterUser,
    validateLesson:validateLesson,
    validateExam:validateExam,
    validateHistory:validateHistory,
    validateContest:validateContest,
    validateFileTopic:validateFileTopic
  };
  module.exports = {validate};
