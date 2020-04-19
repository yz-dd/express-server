//jshint esversion:6

//require modules
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

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

  // create data as JSON to send to Mailchimp, object
  //keys are from the API references
  let data = {
    members: {
      email_address: email,
      status: "subscribed",
      //merge field is an object for first & last name
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }
  };

  //turn js object(data) into flat pack JSON
  let jsonData = JSON.stringify(data);

  //https://usX.api.mailchimp.com/3.0/lists/cb8320f1f8  replace X with server number in your API key
  let url = 'https://us4.api.mailchimp.com/3.0/lists/cb8320f1f8';

  let options = {
    method: 'POST',
    auth: 'Yang1:511da3c3f3927a88200d1fa0d018d689-us4'
  };

  //make request https request, then get response from mailchimp server
 const request = https.request(url, options, (response) => {

  //check status code
  if(response.statusCode === 200) {
    res.sendFile(__dirname + '/success.html');
  } else {
    res.sendFile(__dirname + '/failure.html');
  }

  response.on('data', (data) => {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();

});


//post request for the failure route
app.post('/failure', (req,res) => {
    res.redirect('/');
});

//deploy on heroku, port # will be assigned automatically , locally on 3000
app.listen(process.env.PORT || 3000, () => {
  console.log('server is running on port 3000');
});

//API key
// 511da3c3f3927a88200d1fa0d018d689-us4
//List ID
// cb8320f1f8