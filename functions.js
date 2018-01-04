const request = require('request');

function getPrice() {
    request(
        {
            url: "https://blockchain.info/stats?format=json",
            json: true
        }, (err, res, body) => {
            let price = body.market_price_usd;
        }
    );
}