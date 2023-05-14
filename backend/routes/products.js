const express = require('express');
const router = express.Router();

const stonks = require('../modules/stonks.js');
const pepe = require('../modules/group.js');
const pepepy = require('../modules/pepepy.js')

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
products: [
    {
        "product_name": string
        "price": number,
        "units": int,
    }
];
group_id: "id"

*/
router.post("/add", (req, res) => {
    data = req.body.req;

    res.json(pepe.AddProductsToGroup(data.products, data.group_id));

    pepe.debug();
});


/*
user_id: "id"
group_id: "id"
product_id: "id"
*/
router.post("/user/add", (req, res) => {
    data = req.body.req;

    res.json(pepe.AddUserToProduct(data.user_id, data.product_id, data.group_id));

    pepe.debug();
});

router.post("/user/remove", (req, res) => {
    data = req.body.req;

    res.json(pepe.RemoveUserFromProduct(data.user_id, data.product_id, data.group_id));

    pepe.debug();
});

/*
stonks.GetTransactions("userPFM11", (result) => {
    res.json(result);
});
*/

module.exports = router;