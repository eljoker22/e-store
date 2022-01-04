const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    const { arrayProduct } = req.body;
    const items = JSON.parse(arrayProduct);
    if (req.method === 'POST') {
        try {
            console.log(arrayProduct)
            const arr = [];
            items.forEach(product => {
                arr.push(
                    {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: product.title,
                            images: [product.image]
                        },
                        unit_amount: product.price * 100,
                        },
                        quantity: product.count,
                    }
                )
            });
        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            line_items: arr, // => array items come from front-end
            mode: 'payment',
            success_url: `${req.headers.origin}/thankyou/id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.origin}/?canceled=true`,
        });
        res.redirect(303, session.url);
        } catch (err) {
        res.status(err.statusCode || 500).json(err.message);
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}