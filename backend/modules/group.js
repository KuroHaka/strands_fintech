

var gDB = [];

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

function GetUserInfo(userID, bargain){
    console.log(userID);
    return new Promise(resolve => {
        stonks.GetUser(userID, bargain, (body) => {
            resolve(body);
        })
    })
}

async function GetAllUsers(){
    var userIDS = ["userPFM11","userPFM12","userPFM13","userPFM14","userPFM15"];
    var bargains = [
        "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InhMQVRvOWM2T3VQci1jWEdqMEc3UiJ9.eyJpc3MiOiJodHRwczovL3N0cmFuZHMtZGVtby1iYW5rLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHx1c2VyUEZNMTEiLCJhdWQiOiJodHRwOi8vc2FuZGJveC5zdHJhbmRzY2xvdWQuY29tLyIsImlhdCI6MTY4Mzc5Njc5NCwiZXhwIjoxNjg0MjI4Nzk0LCJhenAiOiJtRG5YajB0TDNZWEVOVldtQ2NOQ2xKUG5lV2loenlIbCIsImd0eSI6InBhc3N3b3JkIn0.Mqxws9jFSp6dCVrlpY5DCNEYGCz9ifo0kQ229T1NvZ51T9X6Aq2okGfpc-sYqTDE35ffLoe5bmmXv0CwOudDfKhW9r3YvC0vUyW6p4C4m8mHgeimbcDTG7h2-umVum9XdpV6VCFu0Xapfran3f7M7wyS63bXgj49EUr_WAOqv8fmHLBOsPqTNRHAO_Yyjpjp196NWiQqVnPGM7QsKeL3T_xvq0rdhaot8bTWFYh2neVUD6NB6hJd-bcMuVu4hW3tAMHfp7eJ-yssHKQRbzQwxDzGwzP6RzSd24uRaWEMWqW7h9wfBY7KXh0D5ohZMIb7R4T9rWH4TCDCMTlrIYL8bg",
        "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InhMQVRvOWM2T3VQci1jWEdqMEc3UiJ9.eyJpc3MiOiJodHRwczovL3N0cmFuZHMtZGVtby1iYW5rLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHx1c2VyUEZNMTIiLCJhdWQiOiJodHRwOi8vc2FuZGJveC5zdHJhbmRzY2xvdWQuY29tLyIsImlhdCI6MTY4Mzc5Njc5NCwiZXhwIjoxNjg0MjI4Nzk0LCJhenAiOiJtRG5YajB0TDNZWEVOVldtQ2NOQ2xKUG5lV2loenlIbCIsImd0eSI6InBhc3N3b3JkIn0.iA01Z__t938mu2wYsLW421L4ehvOsPzRm5-UCc14768pbfCv1l1WMqFKCo-SGM_gZpqwTDzmodzkcTVdP1pHcvrD1kf5RfNRkxmbymjuTPAw4CV20i667IIZ7nByOGPRNtts0O45fve3YVcQUnSf2TTx3d7PBRgdZDASG_wlDJflbJ41UpVsjvlmzgUMVGo0E16gO9WhyqNVDLWAZMmaSvB0pW9lAodsyum_87mhgvSQc40CQIJ7aSxVjB8paIjg0gyS74Um7S1hD5Z_-pz-vlDbmoFYEbse41WjQ45R_wVovfjRuSfVXnVnkYhd5JF3RGQ4zUOnKOYrnSSOKGJjeg",
        "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InhMQVRvOWM2T3VQci1jWEdqMEc3UiJ9.eyJpc3MiOiJodHRwczovL3N0cmFuZHMtZGVtby1iYW5rLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHx1c2VyUEZNMTMiLCJhdWQiOiJodHRwOi8vc2FuZGJveC5zdHJhbmRzY2xvdWQuY29tLyIsImlhdCI6MTY4Mzc5Njc5NSwiZXhwIjoxNjg0MjI4Nzk1LCJhenAiOiJtRG5YajB0TDNZWEVOVldtQ2NOQ2xKUG5lV2loenlIbCIsImd0eSI6InBhc3N3b3JkIn0.da9hzs_Tu-i8SPkMpbALY7PU7hE6Ah_1kYd_lt72uBF_dCKMSufhit6DkA6hgtVlfQX-dBziftE_vybctu0-bea-77J3sGkNwY2FkFnNi7yhnZ01267e1JB9yA0AiNfUhgp1-0lMfQdZYWbdfNWc5GJpz7TlYNnDzaMKBOZmMMaTaK1BPmLpHHMkBdz0hj4Yl0NJ4gFl4tuqpVAXS6l0QKcvaAd-vqtJvuA-Hq0AqoZ3z1rF3S01JffLSb6W9ZylCVNGe-_fqY8fexHpkwb83KHaqkKrykdj8Ys6nzcIiE_cQW-4-2U4A86QiH1jv2bf3rtLTPpqPZgaiMtxLWSlEA",
        "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InhMQVRvOWM2T3VQci1jWEdqMEc3UiJ9.eyJpc3MiOiJodHRwczovL3N0cmFuZHMtZGVtby1iYW5rLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHx1c2VyUEZNMTQiLCJhdWQiOiJodHRwOi8vc2FuZGJveC5zdHJhbmRzY2xvdWQuY29tLyIsImlhdCI6MTY4Mzc5Njc5NSwiZXhwIjoxNjg0MjI4Nzk1LCJhenAiOiJtRG5YajB0TDNZWEVOVldtQ2NOQ2xKUG5lV2loenlIbCIsImd0eSI6InBhc3N3b3JkIn0.K1OEEnZugSMa4ypDrPWLhvKvkV4-Ts0GmhsGJyOZNfIqi2tp7z0BnKNDm-aObaH2I8b9PFn2YXF3Afnktoa7L4rxdHnZAd7efCa3JlspfQ3HkicVgMZrQeN9S48DnP33wuMiOwFIICXNDbyBc6_S49wAgX18LjoRWdfwGrk6Vq8m_As77HdKXGaMu-lPb432B-UFOr3W-qA0fW7z6cpwMVGunV1XsELXZtzSc4BaB-IaUgqkKPITszTJEfH7pisEQMAXPN-Z9OjFc14JvqHgpyMzf-RfbAbyc-aybWVOn5iWkgrsw0ALOo3A6Tcf_F5d-CFRYCgL2x4Fw_tM1d0_OA",
        "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InhMQVRvOWM2T3VQci1jWEdqMEc3UiJ9.eyJpc3MiOiJodHRwczovL3N0cmFuZHMtZGVtby1iYW5rLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHx1c2VyUEZNMTUiLCJhdWQiOiJodHRwOi8vc2FuZGJveC5zdHJhbmRzY2xvdWQuY29tLyIsImlhdCI6MTY4Mzc5Njc5NiwiZXhwIjoxNjg0MjI4Nzk2LCJhenAiOiJtRG5YajB0TDNZWEVOVldtQ2NOQ2xKUG5lV2loenlIbCIsImd0eSI6InBhc3N3b3JkIn0.AeHB-gg_2xolmvvmJxfbe2tBANgvqXLLS_qU-W7oJ4QuoqtH3SZLUH-3lD6M2t0bhIdYEzH5BUTrxidiv6ZpaGeDpQ2d44Vb98a6Qe6NzLGaW2RB9Fv5rq8wQiEKpGK1EqZaoTIas-iHVkWXMF1LOS5DFlxKODFzIDGYptvGpMPpp20zWMd3qcx1Rp726MZqDFBiERPBrZBDMgQt2rPExDcg77TGo6_OvhLDh-0nP-csIfmCeyxOHp_RgsQsf95N6N_SX76m8y4NclRuT7poR8DPfDb68tZGMOIcZWZ9easpoaOHVRAB4S2uP1yPS4GunYf7U0vC0vj1QCcjUgVOag"
    ]

    var res = []

    for(var i = 0; i < userIDS.length; i++){
        var t = JSON.parse(await GetUserInfo(userIDS[i], bargains[i]))
        console.log(t);
        res.push(t)
    }
    
    return res;
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

    var user = JSON.parse(await GetUserInfo(userID)); 
    AddUserToGroup(userID, nextID - 1)

    return {
        "group_id": nextID - 1
    };
}
// Afegeix user a un grup amb una contribució principal
async function AddUserToGroup(userID, groupID){
    var group = GetGroup(groupID);
    if(!group) return {
        "error": 1,
    };

    var user = JSON.parse(await GetUserInfo(userID)); 

    if(!group.users.includes(user)) group.users.push(user);
    return {};
}

async function RemoveUserFromGroup(userID, groupID){
    var group = GetGroup(groupID);

    var user = JSON.parse(await GetUserInfo(userID)); 
    if(group.users.includes(user)){
        const index = group.users.indexOf(user);
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
module.exports.GetAllUsers = GetAllUsers;