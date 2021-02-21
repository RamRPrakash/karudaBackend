const express = require('express')
const app = express()
const mail = require("./mail");
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const port = 1330
const url = 'mongodb://localhost:27017';
var __db = "";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'POST, GET');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Expose-Headers', "Authorization");
  next();
});

MongoClient.connect(url, function(err, client) {
  // assert.equal(null, err);
  console.log("Connected successfully to server");
  __db = client.db("Taxi");
});

app.post('/sendMail', (req, res) => {
  mail.sendMail(req).then((data, error) => {
    if(error){
      res.send("error")
    }
    else{
      console.log("mail sent")
      // you need toMailid, subject, mainContent 
      var reqData = { "data": req.body }
      __db.collection("MailDetails").insertOne(reqData, (err, resData) => {
        if(err){
          res.send("Error")
        }
        else{
          res.send("Success")
        }
      })
    }
  })
});

app.post('/updateData', (req, res) => {
  
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})