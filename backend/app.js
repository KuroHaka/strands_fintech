const express = require('express');
const app = express();

const stonks = require('./modules/stonks.js');

app.get("/test", (req, res) => {
  console.log(stonks.GetUser("userPFM11"));
});

app.listen(8000, () => {
  console.log("Started server");
})
