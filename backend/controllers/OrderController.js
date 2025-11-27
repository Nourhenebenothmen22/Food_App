const Order = require('../models/order');
const User = require('../models/User');
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        if (!userId || !items || !amount || !address) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // 1️⃣ Create Order in DB (payment = false initially)
        const newOrder = await Order.create({
            UserId: userId,
            items,
            amount,
            address,
            payment: false
        });

        // 2️⃣ Update User document to reset carte
        await User.findByIdAndUpdate(
            userId,
            { $set: { carte: {} } }, // $set pour modifier précisément le champ
            { new: true }             // retourne le document mis à jour si besoin
        );

        // 3️⃣ Build line items for Stripe Checkout
        const line_items = items.map(item => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100, // amount in cents
            },
            quantity: item.quantity,
        }));

        // 4️⃣ Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/success?orderId=${newOrder._id}`,
            cancel_url: `${process.env.CLIENT_URL}/cancel`,
        });

        // 5️⃣ Return session URL
        res.status(201).json({
            message: "Order created successfully",
            order: newOrder,
            checkoutUrl: session.url
        });

    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};

module.exports = { placeOrder };
