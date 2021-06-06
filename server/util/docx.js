var superagent = require('superagent');
var mammoth = require("mammoth");



module.exports = { 
   docx: async (req,callback) => {
    const url = req+''
    const response = await superagent.get(url)
      .parse(superagent.parse.image)
      .buffer();
  
    const buffer = response.body;
  
    const text = (await mammoth.extractRawText({ buffer })).value;
    const lines = text.split('@end');
    var resultArr=[];
  
    lines.forEach(element => {
      const arr=element.split('\n');
      var question={};
      var answerChooses=[];
      arr.filter(v => v !== '').forEach(v => {
        const result=v.split('. ')
        if(result[0]*1%1 === 0){
          question.title=result[1];
        }
        if(result[0] === 'A'||result[0] === 'B'||result[0] === 'C'||result[0] === 'D'){
          answerChooses.push(result[1]);
        }
        if(result[0]==='Correct')question.answerRight=result[1];
        if(result[0]==='Note')question.note=result[1];
      });
      question.answerChooses=answerChooses;
      resultArr.push(question);
    });
    resultArr.pop();
    callback(resultArr);
    }
}
