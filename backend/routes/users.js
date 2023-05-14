const express = require('express');
const router = express.Router();

const stonks = require('../modules/stonks.js');
const pepe = require('../modules/group.js');
const pepepy = require('../modules/pepepy.js')

router.post("/get_all", async (req, res) => {
    data = req.body.req;

    var users = {"users": await pepe.GetAllUsers()};
    res.json(users);

    pepe.debug();
});

router.post("/get_transactions", async (req, res) => {
    data = req.body;

    stonks.GetTransactions(data.login.username, (body) => {
        res.json(body);
    });
});


module.exports = router;