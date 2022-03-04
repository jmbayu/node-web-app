'use strict';

const express = require('express');
const fs = require("fs");

// Constants
const PORT = process.env.PORT || "8080";
const HOST = process.env.HOST || "0.0.0.0";
const VERSION = process.env.VERSION || "0.0";

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

// App
const app = express();
app.get('/', (req, res) => {

  jsonReader("./config.json", (err, config) => {
    if (err) {
      console.log("Error reading file:", err);
      return;
    }
    // increase config order count by 1
    config.run_count += 1;
    var rc = config.run_count;
    //
    var timeStamp = Math.floor(new Date().getTime() / 1000)
    var responseObject={ rc, message: "Hello", sender:"Alice", receiver: "Bob", timeStamp}
    res.send(responseObject);

    fs.writeFile("./config.json", JSON.stringify(config), err => {
      if (err) console.log("Error writing file:", err);
    });
  });


});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);