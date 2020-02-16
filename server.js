//jshint esversion:6

const express = require('express');

//app indicates express module
const app = express();

//specify what happens when a browser makes a get request
//(loc of the get request - homepage, )
//request - all info regarding that browser request
//response - res from server that will be sent back to browser
app.get('/', (req, res) => {
  console.log(req);
  res.send('<h1>Hello World!</h1>');
});

app.get('/about', (req, res) => {
  res.send('My name is YZ, and I am a designer');
});

app.get('/contact', (req, res) => {
  res.send('Contact me at: this@email.com');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});