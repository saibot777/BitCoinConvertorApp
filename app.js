const express = require('express');
const request = require('request');
const bodyparser = require('body-parser');
const bitcore = require('bitcore-lib');

let app = express();

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

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
    res.sendFile(__dirname + "/index.html");
})

app.post('/wallet', (req, res) => {
    let brainsrc = req.body.brainsrc;
    let input = new Buffer(brainsrc);
    let hash = bitcore.crypto.Hash.sha256(input);
    let bn = bitcore.crypto.BN.fromBuffer(hash)
    let pk = new bitcore.PrivateKey(bn).toWIF();
    let addy = new bitcore.PrivateKey(bn).toAddress();
    res.send("The Brain Wallet of: " + brainsrc + "<br>Addy: " + addy + "<br> Private Key: " + pk);
});

app.listen(3000, () => {
    console.log('Server is running...');
})