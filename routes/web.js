const homeController = require('../app/http/controllers/homeController');
const authController = require('../app/http/controllers/authController');
const cardController = require('../app/http/controllers/customers/cartController')

function initRoutes(app) {
    app.get('/', homeController().index);

    app.get('/login', authController().login);
    app.post('/login', authController().postLogin)

    app.get('/register', authController().register);
    app.post('/register', authController().postRegister)

    app.get('/cart', cardController().index);
    app.post('/update-cart', cardController().update);
}

module.exports = initRoutes;
