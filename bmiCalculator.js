//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

//home page, 3000/route, responding to browser's get request
app.get('/', (req,res) => {
  res.send(__dirname + 'bmiCalculator.html');
});

app.post('/', (req,res) => {
  let weight = Number(req.body.weight);
  let height = Number(req.body.height);
  let bmiResult = weight / powerof(height);
  
  res.send('The result of BMI is ' + bmiResult);
});
