const https = require('https');

const headers = {
    "accept": 'application/json',
    "x-api-key": 'LavC2RpKCvN38NljAC7H6UJzdtFwUNZ1lP0dUGej',
};

function GenerateHeader(bearer){
    var r = JSON.parse(JSON.stringify(headers));
    r.Authorization = "bearer " + bearer;
}

async function GetUser(bearer, userID, callback){
    https.get({
        hostname: "int.strandscloud.com",
        path: "/fs-api/users/" + userID,
        headers: GenerateHeader(bearer),
      }, (response) => {
        var result = ''
        response.on('data', function (chunk) {
            result += chunk;
        });
    
        response.on('end', function () {
            callback(result);
        });
    });
};

async function GetTransactions(bearer, userID, callback){
    https.get({
        hostname: "int.strandscloud.com",
        path: "/fs-api/transactions/",
        headers: GenerateHeader(bearer),
      }, (response) => {
        var result = ''
        response.on('data', function (chunk) {
            result += chunk;
        });
    
        response.on('end', function () {
            callback(JSON.parse(result));
        });
    });
}

module.exports.GetUser = GetUser;
module.exports.GetTransactions = GetTransactions;