const express = require('express')
const app = express()
const mail = require("./mail");
const MongoClient = require('mongodb').MongoClient;

const port = 1330

const url = 'mongodb://localhost:27017';
var __db = ""

MongoClient.connect(url, function(err, client) {
  // assert.equal(null, err);
  console.log("Connected successfully to server");
  const __db = client.db("Taxi");
});

app.post('/sendMail', (req, res) => {
  mail.sendMail(req).then((data, error) => {
    if(error){
      res.send("error")
    }
    else{
      var data = { "data": req.body }
      __db.collection("MailDetails").insertOne()
      res.send("Success")
    }
  })
});

app.post('/updateData', (req, res) => {
  
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})