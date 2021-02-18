const { update } = require("../../../models/pizza")

function cardController() {
    return {
        index(req, res) {

            res.render('customers/cart')
        },
        update(req, res) {
            // Create cart for first time and add basic obj structure
            if (!req.session.cart) {
                req.session.cart = {
                    items: {},
                    totalQuantity: 0,
                    totalPrice: 0
                }
            }

            let cart = req.session.cart
            console.log(req.body)
            //Check if item dosen't exist in cart
            if (!cart.items[req.body._id]) {
                cart.items[req.body._id] = {
                    item: req.body,
                    quantity: 1
                }
                cart.totalQuantity += 1;
                cart.totalPrice = cart.totalPrice + req.body.price;
            } else {
                cart.items[req.body._id].quantity += 1;
                cart.totalQuantity += 1;
                cart.totalPrice = cart.totalPrice + req.body.price;
            }

            return res.json({ totalQuantity: req.session.cart.totalQuantity })
        }
    }
}

module.exports = cardController