const request = require('request');

const options = {
  method: 'POST',
  url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'accept-encoding': 'application/gzip',
    'x-rapidapi-key': 'bb84dcd99fmsh357bdaa38d0a4ffp1572b5jsnbf4f9895786b',
    'x-rapidapi-host': 'google-translate1.p.rapidapi.com',
    useQueryString: true
  },
  form: {
    q: 'Cloud Translation can dynamically translate text between thousands of language pairs. Translation lets websites and programs programmatically integrate with the translation service.',
    target: 'vi',
    source: 'en'
  }
};

request(options, function (error, response, body) {
	if (error) throw new Error(error);
	console.log(body);
});