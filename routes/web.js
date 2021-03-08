const adminOrderController = require('../app/http/controllers/admin/orderController')
const authController = require('../app/http/controllers/authController');
const cardController = require('../app/http/controllers/customers/cartController')
const homeController = require('../app/http/controllers/homeController');
const orderController = require('../app/http/controllers/customers/orderController');
const guest = require('../app/http/middlewares/guest');
const auth = require('../app/http/middlewares/auth');


function initRoutes(app) {
    app.get('/', homeController().index);

    app.get('/login', guest, authController().login);
    app.post('/login', authController().postLogin);

    app.get('/register', guest, authController().register);
    app.post('/register', authController().postRegister);

    app.post('/logout', authController().logout)

    app.get('/cart', cardController().index);
    app.post('/update-cart', cardController().update);

    app.post('/order', auth, orderController().store)
    app.get('/customers/orders', auth, orderController().index)

    app.get('/admin/orders', auth, adminOrderController().index)
}

module.exports = initRoutes;