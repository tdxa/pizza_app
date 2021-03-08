import axios from 'axios'
import Noty from 'noty'
import {initAdmin} from './admin'

let addToCart = document.querySelectorAll('.add-to-cart');
let cartCounter = document.querySelector('#counter');

function updateCart(pizza) {
    axios.post('update-cart', pizza).then(res => {
        cartCounter.innerText = res.data.totalQuantity;
        new Noty({
            type: 'success',
            timeout: 1000,
            progressBar: false,
            text: "pizza added to cart!"
        }).show();
    }).catch(err => {
        new Noty({
            type: 'error',
            timeout: 1000,
            progressBar: false,
            text: "Something went wrong :("
        }).show();
    })
};


addToCart.forEach((button) => {
    button.addEventListener('click', (e) => {
        let pizza = JSON.parse(button.dataset.pizza)
        updateCart(pizza)
    })
});

initAdmin()
