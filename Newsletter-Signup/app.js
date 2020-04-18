//jshint esversion:6

//require modules
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.listen(3000, () => {
  console.log('server is running on prot 3000');
});