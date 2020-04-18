//jshint esversion:6

//require modules
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

//express' static function for loading loacal files, providing path to static files like css and img assets
//same name (public) as created in the folder
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));

//response to get request
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/signup.html');
});

//response to post request
app.post('/', (req, res) => {

  let firstName = req.body.fName;
  let lastName = req.body.lName;
  let email = req.body.Email;

  console.log(firstName + ' ' + lastName + ' ' + email);
});

app.listen(3000, () => {
  console.log('server is running on port 3000');
});