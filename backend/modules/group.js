

var gDB = [];
/*
var gDB = [
  {
    display_name: 'Test',
    users: [ 'Minerva McGonagall' ],
    products: [
      {
        product_name: 'Besf Carpaccio',
        price: 1200,
        users: [],
        units: 5,
        id: 0
      },
      {
        product_name: 'Golden Sirt 3',
        price: 4500,
        users: [],
        units: 2,
        id: 1
      },
      {
        product_name: 'OPEN FoOD',
        price: 1125,
        users: [],
        units: 1,
        id: 2
      },
      {
        product_name: 'Lokun',
        price: 3905,
        users: [],
        units: 111,
        id: 3
      },
      {
        product_name: 'Onion Flower',
        price: 320,
        users: [],
        units: 4,
        id: 4
      },
      {
        product_name: 'French Fries',
        price: 180,
        users: [],
        units: 4,
        id: 5
      },
      {
        product_name: 'Golden Baklava',
        price: 5850,
        users: [],
        units: 15,
        id: 6
      },
      {
        product_name: 'Heineken',
        price: 55,
        users: [],
        units: 1,
        id: 7
      },
      {
        product_name: 'Negroni',
        price: 75,
        users: [],
        units: 1,
        id: 8
      },
      {
        product_name: 'Petrus 2009',
        price: 200000,
        users: [],
        units: 2,
        id: 9
      },
      {
        product_name: 'Chteau Margaux',
        price: 15500,
        users: [],
        units: 1,
        id: 10
      },
      {
        product_name: 'Sti1 Water 800',
        price: 405,
        users: [],
        units: 9,
        id: 11
      },
      {
        product_name: 'Virgin Mojito',
        price: 180,
        users: [],
        units: 4,
        id: 12
      }
    ],
    id: 0,
    _nextProductID: 13
  }
]
*/

var nextID = 0;


const util = require('util')

const stonks = require('./stonks')
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

function GetUserFullName(userID, callback){
    return new Promise(resolve => {
        stonks.GetUser(userID, (body) => {
            resolve(body);
        })
    })
}

// Aconsegueix info principal del grup i info del userID
async function CreateGroup(info, userID){
    gDB.push({
        "display_name": info.display_name,
        "users": [],
        "products": [],
        "id": nextID,
        "_nextProductID": 0
    });
    nextID += 1;

    var username = JSON.parse(await GetUserFullName(userID)); 
    AddUserToGroup(username.name + " " + username.firstSurname, nextID - 1)

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