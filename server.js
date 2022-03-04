'use strict';

const express = require('express');
const si = require('systeminformation');
const fs = require('fs');

// Constants
const PORT = process.env.PORT || "8080";
const HOST = process.env.HOST || "0.0.0.0";
const VERSION = process.env.VERSION || "0.0";
const CONFPATH="./config.json";

// Functions
function jsonReader(filePath, cb) {
  fs.readFile(filePath, (err, fileData) => {
    if (err) {
      return cb && cb(err);
    }
    try {
      const object = JSON.parse(fileData);
      return cb && cb(null, object);
    } catch (err) {
      return cb && cb(err);
    }
  });
}

// Si
var sdata={}

si.versions(function(si_data) {
    console.log('versions:');
    console.log(si_data);
    sdata=si_data
});

// App
const app = express();
app.get('/', (req, res) => {

  jsonReader(CONFPATH, (err, config) => {
    if (err) {
      console.log("Error reading file:", err);
      return;
    }
    // increase config order count by 1
    config.run_count += 1;
    var runcount = config.run_count;
    //
    var timeStamp = Math.floor(new Date().getTime() / 1000)
 
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);

    var isodate=today.toISOString(); 

    var responseObject={ runcount, timeStamp, isodate, message: "Hello", sender:"Alice", receiver: "Bob", sdata }
    console.log(responseObject);
    res.send(responseObject);

    fs.writeFile(CONFPATH, JSON.stringify(config), err => {
      if (err) console.log("Error writing file:", err);
    });
  });


});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);