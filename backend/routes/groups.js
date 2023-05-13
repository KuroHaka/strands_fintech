const express = require('express');
const router = express.Router();

const stonks = require('../modules/stonks.js');
const pepe = require('../modules/group.js');
const pepepy = require('../modules/pepepy.js');

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

router.post("/create_receipt", (req, res) => {
    data = req.body.req;

    pepepy.PostImage({image: data.img64}, (imgRes) => {
        var products = [];

        for(var i = 0; i < imgRes.product_list.length; i++){
            var product = imgRes.product_list[i];
            products.push({
                product_name: product.productName,
                price: product.price,
                units: product.units
            });
        }

        console.log("Products:", products);

        var groupInfo = pepe.CreateGroup({
            "display_name": "Test"
        }, req.body.login.username);

        pepe.AddProductsToGroup(products, groupInfo.group_id);

        pepe.debug();

        res.json(imgRes);
    });
});

/*
stonks.GetTransactions("userPFM11", (result) => {
    res.json(result);
});
*/

module.exports = router;