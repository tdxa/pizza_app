function cardController() {
    return{
        index(req,res){
            res.render('customers/cart')
        }
    }
}

module.exports = cardController