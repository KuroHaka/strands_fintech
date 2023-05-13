const express = require('express');
const router = express.Router();

const stonks = require('../modules/stonks.js');
const pepe = require('../modules/group.js');
/*
req.body: 
{
    login: {
        secret: string,
        username: string
    }
    req: {
        <>
    }
}
*/

/*
display_name: string
*/
router.post("/create", (req, res) => {
    res.json(pepe.CreateGroup(req.body.req, req.body.login.username));

    pepe.debug();
});

router.post("/get", (req, res) => {
    data = req.body.req;
    res.json(pepe.GetGroup(data.group_id))
});

/*
group_id: id
user_id: id
*/
router.post("/users/add", (req, res) => {
    data = req.body.req;

    res.json(pepe.AddUserToGroup(data.user_id, data.group_id));

    pepe.debug();
});

router.post("/users/remove", (req, res) => {
    data = req.body.req;

    res.json(pepe.RemoveUserFromGroup(data.user_id, data.group_id));
});

/*
stonks.GetTransactions("userPFM11", (result) => {
    res.json(result);
});
*/

module.exports = router;