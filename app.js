const express = require('express');
let app = express();
const request = require('request');

request(
    {
        url: "https://blockchain.info/stats?format=json",
        json: true
    }, (error, response, body) => {
        btcPrice = body.market_price_usd;
        btcBlocks = body.n_blocks_total;
    }
);

app.get('/', (req, res) => {
    res.send('Bitcoin rules');
});

app.get('/block', (req, res) => {
    res.sendfile("index.html");
})

app.listen(3000, () => {
    console.log('Server is running...');
})