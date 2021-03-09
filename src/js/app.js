import axios from 'axios'
import Noty from 'noty'
import { initAdmin } from './admin'

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

//Change order status
let statusAll = document.querySelectorAll('.status_line')
let hiddenInput = document.querySelector('#hiddenInput');
let order = hiddenInput ? hiddenInput.value : null;
order = JSON.parse(order)
let time = document.createElement('small')


function updateStatus(order) {
    let stepCompleted = true;
    statusAll.forEach((status) => {
        let dataProp = status.dataset.status;

        if (stepCompleted) {
            status.classList.add('step-completed');
        }

        if (dataProp === order.status) {
            stepCompleted = false;
            //TODO Update time from mongo
            time.innerText = '20:12'
            status.appendChild(time)
            if (status.nextElementSibling) {
                status.nextElementSibling.classList.add('step-current')
            }
        }
    });
}

updateStatus(order);

//Socket
let socket = io();

if (order) {
    socket.emit('join', `order_${order._id}`);
}

