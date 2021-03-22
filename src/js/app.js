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



//Change order status
let statusAll = document.querySelectorAll('.status_line')
let hiddenInput = document.querySelector('#hiddenInput');
let order = hiddenInput ? hiddenInput.value : null;
order = JSON.parse(order)
let time = document.createElement('small')


function updateStatus(order) {
    statusAll.forEach((status) => {
        status.classList.remove('step-completed');
        status.classList.remove('current')
    })

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
initAdmin(socket)

if (order) {
    socket.emit('join', `order_${order._id}`);
}

let adminSectionPath = window.location.pathname
if (adminSectionPath.includes('admin')) {
    socket.emit('join', 'adminRoom')
}


socket.on('orderUpdated', () => {
    const updated = { ...order }
    updated.updatedAt = Date.now().toLocaleString('en-GB')
    updated.status = data.status
    updateStatus(updated)
    console.log(updated)
})

