const _http = require('http');
const _request = require('request');

_http.createServer((req, res) => {
    console.log('Server started...')
}).listen(3000);