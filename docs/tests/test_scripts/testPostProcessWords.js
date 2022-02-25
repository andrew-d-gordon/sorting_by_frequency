// Server attributes
const serverIP = 'http://localhost';
const serverPort = '3001';

// Test endpoints
var endpoints = ['/api/processWords'];

// Set request reference
var request = require('request');

// Set body data
var bodyData = {
    newWords: ['this', 'is', 'a', 'test']
}

// Set request options
var options = {
    method: 'POST',
    url: serverIP+':'+serverPort+endpoints[0],
    headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
    },
    body: bodyData,
    json: true
}

request(options, (error, response, body) => {
    if (error) throw new Error(error)

    console.log('This is response JSON: ' + JSON.stringify(body))
});