const http = require('http');

const direction = "http://localhost";

/*
{
    image: "base64"
}
*/
function postImage(body, callback){
    var req = http.request({
        host: '127.0.0.1',
        port: 5000,
        path: "/entry_recipet",
        method: 'POST'
    }, function(res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            callback(JSON.parse(chunk));
        });
    });
    
    req.setHeader('content-type', 'application/json');
    req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });
    
    // write data to request body
    req.write(JSON.stringify(body));
    req.end();
}

module.exports.PostImage = postImage;