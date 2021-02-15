const homeController = require('../app/http/controllers/homeController');
const authController = require('../app/http/controllers/authController');
const cardController = require('../app/http/controllers/customers/cartController')

function initRoutes(app) {
    app.get('/', homeController().index);
    app.get('/cart',cardController().index);
    app.get('/login', authController().login);
    app.get('/register', authController().register);
}

module.exports = initRoutes;
