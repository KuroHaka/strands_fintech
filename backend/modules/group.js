

// var gDB = [];
var gDB = [
    {
      display_name: 'Hola',
      users: [ 'userPFM11', 'userPFM12' ],
      products: [
        {
          product_name: 'Coca-Cola',
          price: '1.5',
          users: [],
          units: 3,
          id: 0
        },
        { product_name: 'Fanta', price: '2', users: [], units: 3, id: 1 },
        {
          product_name: 'KitKat',
          price: '4.5',
          users: [],
          units: 3,
          id: 2
        }
      ],
      id: 0,
      _nextProductID: 3
    }
  ];

var nextID = 0;


const util = require('util')
/*
group: {
    display_name: string,
    users: [id],
    products: [products]
    id: int
}

product: {
    product_name: string,
    price: number,
    users: [id],
    units: number,
    id: id
}
*/
function GetGroup(id){
    for(var i = 0; i < gDB.length; i++){
        if(gDB[i].id == id) return gDB[i];
    }
    return {};
}

function GetJsonGroup(id){
    return {
        "group": JSON.parse(JSON.stringify(GetGroup(id)))
    }
}

function GetProduct(group, productID){
    for(var i = 0; i < group.products.length; i++){
        if(group.products[i].id == productID) return group.products[i];
    }
}

// Aconsegueix info principal del grup i info del userID
function CreateGroup(info, userID){
    gDB.push({
        "display_name": info.display_name,
        "users": [userID],
        "products": [],
        "id": nextID,
        "_nextProductID": 0
    });
    nextID += 1;

    return {
        "group_id": nextID - 1
    };
}
// Afegeix user a un grup amb una contribució principal
function AddUserToGroup(userID, groupID){
    var group = GetGroup(groupID);
    if(!group) return {
        "error": 1,
    };

    if(!group.users.includes(userID)) group.users.push(userID);
    return {};
}

function RemoveUserFromGroup(userID, groupID){
    var group = GetGroup(groupID);

    if(group.users.includes(userID)){
        const index = group.users.indexOf(userID);
        group.users.splice(index, 1);
    }

    return {};
}

/*
products es un array de productes com al slack
*/
function AddProductsToGroup(products, groupID){
    var group = GetGroup(groupID);

    for(var i = 0; i < products.length; i++){
        group.products.push({
            "product_name": products[i].product_name,
            "price": products[i].price,
            "users": [],
            "units": products[i].units,
            "id": group._nextProductID,
        });
        group._nextProductID++;
    }

    return {};
}

function AddUserToProduct(userID, productID, groupID){
    var group = GetGroup(groupID);

    var product = GetProduct(group, productID);
    product.users.push(userID);

    return {}
}

function RemoveUserFromProduct(userID, productID, groupID){
    var group = GetGroup(groupID);

    var product = GetProduct(group, productID);

    if(product.users.includes(userID)){
        const index = product.users.indexOf(userID);
        product.users.splice(index, 1);
    }

    return {};
}

function Debug(){
    console.log("--------------")
    console.log(util.inspect(gDB, false, null, true))
}

module.exports.db = gDB;
module.exports.debug = Debug;

module.exports.CreateGroup = CreateGroup;
module.exports.GetGroup = GetJsonGroup;
module.exports.RemoveUserFromGroup = RemoveUserFromGroup;
module.exports.AddUserToGroup = AddUserToGroup;
module.exports.AddProductsToGroup = AddProductsToGroup;

module.exports.GetProduct = GetProduct;
module.exports.AddUserToProduct = AddUserToProduct;