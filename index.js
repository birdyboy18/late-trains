var express = require('express'),
    app = express(),
    firebase = require('firebase'),
    r = require('request'),
    bodyParser = require('body-parser'),
    https = require('https');

app.use(bodyParser.json());

app.get('/',function(req,res){
  res.send("Hello world");
});

var fb = new firebase('shining-fire-9321.firebaseio.com');

app.get('/stations',function(req,res){
  fb.child('stations').on('value',function(snapshot){

    res.format({
      "application/json": function(){
        res.send(snapshot.val());
      }
    });

  });
});

app.get('/journey/:from/to/:to', function(req,res){
  var username = "rttapi_birdyboy18";
  var password = "9c085a1a190ac4008255927293122d0aef0529cf";
  var auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
  var url = "https://api.rtt.io/api/v1/json/search/" + req.params.from + "/to/" + req.params.to;
  var authURL = "http://" + username + ":" + password + "@api.rtt.io/api/v1/json/search/" + req.params.from + "/to/" + req.params.to;

  //console.log(auth);

  var options = {
    hostname: "api.rtt.io",
    path: "/api/v1/json/search/" + req.params.from + "/to/" + req.params.to,
    method: 'GET',
    auth: {
      username: username,
      password: password
    },
    rejectUnauthorized: false,
    requestCert: false,
    agent: false
  }

  var req = https.request(options, function(res) {
    console.log("statusCode" + res.statusCode);
    console.log("headers: " + res.headers);

    res.on('data', function(data){
      console.log(data);
    });
  });
  req.end();

  req.on('error',function(err){
    console.log(err);
  });

});

app.listen(3000);
