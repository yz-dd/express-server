//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

// localhost:3000/bmicalculator route, responding to browser's get request
app.get('/bmicalculator', (req,res) => {
  res.sendFile(__dirname + '/bmiCalculator.html');
});

app.post('/bmicalculator', (req,res) => {
  let weight = parseFloat(req.body.weight);
  let height = parseFloat(req.body.height);
  let bmiResult = weight / (Math.pow(height, 2));
 
  res.send('The result of BMI is ' + bmiResult);
});

//set up the fking port!!
app.listen(3000, () => {
  console.log('Server started on port 3000');
});