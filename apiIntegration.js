const mercadopago = require('mercadopago')
const express = require('express');
const app = express();


mercadopago.configure({
    sandbox: true,
    access_token: "TEST-6311716851175989-072418-8098f6f602b9650727025f94110d85c7-614870969"
});


app.get('/', async (req, res) => {
    const payments = await mercadopago.payment.search()
    res.send(payments)
})

app.listen (3000, () => console.log('App working'))



//"start": "expo start",
