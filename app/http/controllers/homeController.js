const Pizza = require('../../models/pizza');

function homeController() {
    return {
        async index(req, res) {
            const pizza = await Pizza.find();
            return res.render('home', { pizzas: pizza });
            // Pizza.find().then(function(pizzas) {
            //     console.log(pizzas)
            //     return res.render('home', { pizzas: pizzas });
            // })
        }
    }
}

module.exports = homeController