//jshint esversion:6

const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
  
});

app.post('/', (req, res) => {

  // console.log(req.body.CityName);
  //$('#CityInput').val(); jQ not work on backend

  let query = req.body.CityName;
  const apiKey = 'e201f68bfdedbea8382e4db3288b835a';
  const unit = 'metric';

  const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&appid=' + apiKey + '&units=' + unit;
  //make a get request to external server
  https.get(url, (response) => {
    console.log(response.statusCode);
    //when we received data
    response.on('data', (data) => {
      //converting data into js object (from hex decimal, binary), strings to object
      const weatherData = JSON.parse(data);
      console.log(weatherData);

      const temp = weatherData.main.temp;
      const feelslike = weatherData.main.feels_like;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = 'http://openweathermap.org/img/wn/'+icon+'@2x.png';
      // const object = {
      //   name: 'Yang Zhang',
      //   favoriateFood: 'Ramen'
      // };
      // JSON.stringify(object);

      //going to the client browser, write multiple times into response
      res.write("<p>The weather is currently " + description + "</p>");
      res.write("<img src='" + imageURL + "'>");
      res.write("<h1>The temperature in " + query +  " is " + temp + " degrees Celcius</h1>");
      res.send(); 
    });
  });
  //after send is done, can only send ONCE
  //res.send('Server is up and running.');
});


app.listen(3000, () => {
  console.log('Server is running on port 3000.');
});