const Order = require('../../../models/order')

function orderController() {
    return {
        index(req, res) {
            Order.find().populate('customerId', '-password').exec((err, orders) => {
                if (req.xhr) {
                    return res.json(orders)
                } else {
                    return res.render('admin/orders')
                }
            })
        }
    }
}

module.exports = orderController;