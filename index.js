const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.listen(3000, () => console.log('starting'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/', (req,res) => {
    let body = req.body;
    let crypto = body.crypto;
    let fiat = body.fiat;

    res.send('Currently unavailable');
})