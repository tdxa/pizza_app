const Order = require('../../../models/order')

function orderController() {
    return {
        store(req, res) {
            const { phone, address } = req.body;
            if (!phone || !address) {
                req.flash('error', 'Please fill in all fields!');
                return res.redirect('/cart');
            }

            const order = new Order({
                customerId: req.user._id,
                items: req.session.cart.items,
                phone: phone,
                address: address,
            })

            order.save().then(result => {
                req.flash('success', 'Order placed successfully!');
                delete req.session.cart
                return res.redirect('/customers/orders');
            }).catch(err => {
                req.flash('error', 'Something went wrong! Try again.');
                return res.redirect('/cart');
            })
        },
        async show(req, res) {
            const order = await Order.findById(req.params.id);

            if (req.user._id.toString() === order.customerId.toString()) {
                return res.render('customers/orderPreview', { order: order })
            }

            return res.redirect('/')
        },

        async index(req, res) {
            const orders = await Order.find({ customerId: req.user._id });
            res.header('Cache-Control', 'no-store, private, no-store')
            return res.render('customers/orders', { orders: orders })
        }
    }
}

module.exports = orderController;