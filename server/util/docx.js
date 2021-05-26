var superagent = require('superagent');
var mammoth = require("mammoth");

module.exports = { 
   docx: async (req) => {
    const url = 'https://firebasestorage.googleapis.com/v0/b/er-system-2b346.appspot.com/o/testData.docx?alt=media&token=966c7bc4-cd94-49b7-b621-f604e927ff10'

    const response = await superagent.get(url)
      .parse(superagent.parse.image)
      .buffer();
  
    const buffer = response.body;
  
    const text = (await mammoth.extractRawText({ buffer })).value;
    const lines = text.split('@end');
    resultArr=[];
  
    lines.forEach(element => {
      const arr=element.split('\n');
      question=new Question();
      answerChooses=[];
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
    return resultArr;
    }
}
