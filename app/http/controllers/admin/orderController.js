const Order = require('../../../models/order')

function orderController() {
    return {
        index(req, res) {
            Order.find().populate('customerId', '-password').exec((err, orders) => {
                if (req.xhr) {
                    console.log("XDD", err, orders)
                    return res.json(orders)
                } else {
                    console.log(req.xhr)
                    return res.render('admin/orders')
                }
            })
            //const orders = Order.find().populate('customerId');
        }
    }
}

module.exports = orderController;