//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
//experss use body-parser
//extract info posted from html form, another example is bodyParser.json()
app.use(bodyParser.urlencoded({extended: true})); 

app.get('/',(req, res) =>  {
  //use constent instead of relative file path
  //__dirname gives the current file path no matter where is hosted
  res.sendFile(__dirname + '/index.html');
});

// accepting post request
app.post('/', (req,res) => {
  //parsed version of https request
  // console.log(req.body.num1);
  // res.send('Thanks for posting that!');

  let num1 = Number(req.body.num1);
  let num2 = Number(req.body.num2);

  let result = num1 + num2;
  res.send('The result of the calculation is ' + result);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000.');
});