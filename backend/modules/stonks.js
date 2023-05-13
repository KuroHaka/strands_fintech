const https = require('https');

const headers = {
    "Authorization": 'bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InhMQVRvOWM2T3VQci1jWEdqMEc3UiJ9.eyJpc3MiOiJodHRwczovL3N0cmFuZHMtZGVtby1iYW5rLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHx1c2VyUEZNMTEiLCJhdWQiOiJodHRwOi8vc2FuZGJveC5zdHJhbmRzY2xvdWQuY29tLyIsImlhdCI6MTY4Mzc5Njc5NCwiZXhwIjoxNjg0MjI4Nzk0LCJhenAiOiJtRG5YajB0TDNZWEVOVldtQ2NOQ2xKUG5lV2loenlIbCIsImd0eSI6InBhc3N3b3JkIn0.Mqxws9jFSp6dCVrlpY5DCNEYGCz9ifo0kQ229T1NvZ51T9X6Aq2okGfpc-sYqTDE35ffLoe5bmmXv0CwOudDfKhW9r3YvC0vUyW6p4C4m8mHgeimbcDTG7h2-umVum9XdpV6VCFu0Xapfran3f7M7wyS63bXgj49EUr_WAOqv8fmHLBOsPqTNRHAO_Yyjpjp196NWiQqVnPGM7QsKeL3T_xvq0rdhaot8bTWFYh2neVUD6NB6hJd-bcMuVu4hW3tAMHfp7eJ-yssHKQRbzQwxDzGwzP6RzSd24uRaWEMWqW7h9wfBY7KXh0D5ohZMIb7R4T9rWH4TCDCMTlrIYL8bg',
    "accept": 'application/json',
    "x-api-key": 'LavC2RpKCvN38NljAC7H6UJzdtFwUNZ1lP0dUGej',
};

async function GetUser(userID, callback){
    https.get({
        hostname: "int.strandscloud.com",
        path: "/fs-api/users/" + userID,
        headers: headers,
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

async function GetTransactions(userID, callback){
    https.get({
        hostname: "int.strandscloud.com",
        path: "/fs-api/transactions/",
        headers: headers,
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