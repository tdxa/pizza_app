//Controllers
const adminOrderController = require('../app/http/controllers/admin/orderController')
const adminStatusController = require('../app/http/controllers/admin/statusController')
const authController = require('../app/http/controllers/authController');
const cardController = require('../app/http/controllers/customers/cartController')
const homeController = require('../app/http/controllers/homeController');
const orderController = require('../app/http/controllers/customers/orderController');

//Middlewares
const guest = require('../app/http/middlewares/guest');
const auth = require('../app/http/middlewares/auth');
const admin = require('../app/http/middlewares/admin');


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

    app.get('/admin/orders', admin, adminOrderController().index)
    app.post('/admin/order/status', admin, adminStatusController().update)
}

module.exports = initRoutes;