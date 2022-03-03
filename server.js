'use strict';

const express = require('express');


// Constants
const PORT = process.env.PORT || "8080";
const HOST = process.env.HOST || "0.0.0.0";
const VERSION = process.env.VERSION || "0.0";
const myObject={ id: 1, message: "Hello", sender:"Alice", receiver: "Bob"}

// App
const app = express();
app.get('/', (req, res) => {
  // res.send(`Hello World  VERSION ${VERSION}`);
  res.send(myObject);

});

app.listen(PORT, HOST);
console.log(myObject);
console.log(`Running on http://${HOST}:${PORT}`);