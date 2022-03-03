'use strict';

const express = require('express');

// Constants
const PORT = process.env.PORT || "8080";
const HOST = process.env.HOST || "0.0.0.0";
const VERSION = process.env.VERSION || "0.0";

// App
const app = express();
app.get('/', (req, res) => {

  var timeStamp = Math.floor(new Date().getTime() / 1000)
  var responseObject={ id: 1, message: "Hello", sender:"Alice", receiver: "Bob", timeStamp}
  res.send(responseObject);

});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);