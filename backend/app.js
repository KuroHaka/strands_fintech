const express = require('express');
const app = express();

const stonks = require('./modules/stonks.js');
const money = require('./modules/group.js');

const util = require('util')

var group0 = money.CreateGroup({
  "display_name": "Domino's pizza",
  "amount": 100,
}, "user0");

money.SetUserGroupContribution("Danilo", group0, 10);
money.SetUserGroupContribution("Aran", group0, 20);

console.log(util.inspect(money.db, false, null, true /* enable colors */))
console.log("Falta per pagar", money.GetRemaining(group0))


app.get("/test", (req, res) => {
  stonks.GetTransactions("userPFM11", (result) => {
    res.json(result);
  });
});

app.listen(8000, () => {
  console.log("Started server");
})
