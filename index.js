const express = require('express');
const stripe = require('stripe')('sk_test_51PiYtwRoZ63SdlpE1RrgVxqRtCwOmg6BMHvm4VU2LiBMZTOYxVko8l6G7bCnZXV7WA9tuByXCbDP5272gSIpchnC00b4cqa7fU');
const app = express();

app.post('/create-payment-intent', async (req, res) => {
    const { amount } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
