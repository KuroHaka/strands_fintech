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


module.exports = router;