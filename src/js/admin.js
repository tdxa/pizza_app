import axios from 'axios'

export function initAdmin() {
    const orderTable = document.querySelector('#orders');
    console.log('orrrrrrrrrrrrrrr ' + orderTable)
    let orders = []
    let markup;

    axios.get('/admin/orders', {
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then(res => {
        orders = res.data
        markup = generateMarkup(orders)
        orderTable.innerHTML = markup
    }).catch(err => {
        console.log(err);
    });

    function renderItems(items) {
        let orderItems = Object.values(items)
        return orderItems.map((pizza) => {
            return `
                <p>${pizza.item.name} - ${pizza.quantity} pcs </p>
            `
        }).join('')
    }

    function generateMarkup(orders) {
        return orders.slice().reverse().map(order => {
            return `
                <tr>
                    <td class="border px-4 py-2">
                        <p>${order._id}</p>
                        <div>${renderItems(order.items)}</div>
                    </td>
                    <td class="border px-4 py-2">
                        ${order.customerId.name}
                    </td>
                    <td class="border px-4 py-2">
                        ${order.phone}
                    </td>
                    <td class="border px-4 py-2">
                        ${order.address}
                    </td>
                    <td class="border px-4 py-2">
                        ${order.date.toLocaleString('en-GB')}
                    </td>
                    <td class="border px-4 py-2">
                        ${order.status}
                    </td>
                </tr>
            `
        }).join('');
    }
}

