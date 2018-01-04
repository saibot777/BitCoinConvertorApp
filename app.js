const express = require('express');
const request = require('request');
const bodyparser = require('body-parser');
const bitcore = require('bitcore-lib');
let app = express();

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

app.set("view engine", "ejs");

const brainWallet = (uinput, callback) => {
    let input = new Buffer(uinput);
    let hash = bitcore.crypto.Hash.sha256(input);
    let bn = bitcore.crypto.BN.fromBuffer(hash)
    let pk = new bitcore.PrivateKey(bn).toWIF();
    let addy = new bitcore.PrivateKey(bn).toAddress();
    callback(pk, addy);
};

request({
    url: "https://blockchain.info/ticker",
    json: true
}, (err, res, body) => {
    price = body.btc_usd.last;
});

app.get('/', (req, res) => {
    res.render("index", {
        lastPrice: price
    });
})

app.post('/wallet', (req, res) => {
    let brainsrc = req.body.brainsrc;
    brainWallet(brainsrc, (key, addr) => {
        res.send("The Brain Wallet of: " + brainsrc + "<br>Addy: " + addr + "<br> Private Key: " + key);
    });
});

app.listen(3000, () => {
    console.log('Server is running...');
})