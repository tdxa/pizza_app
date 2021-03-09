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
                        <div class="inline-block relative">
                            <form action="/admin/order/status" method="POST">
                                <input type="hidden" name="orderId" value="${order._id}">
                                <select name="status" onchange="this.form.submit()" class="block appearance-none w-full px-4 py-2 pr-8 shadow leading-tight focus:outline-none focus:shadow-outline bg-white border border-gray-400 hover:border-gray-500">
                                    <option value="order_placed" ${order.status === 'order_placed' ? 'selected' : ''}>Placed</option> 
                                    <option value="confirmed" ${order.status === 'confirmed' ? 'selected' : ''}>Confirmed</option>
                                    <option value="prepared" ${order.status === 'prepared' ? 'selected' : ''}>Prepared</option>
                                    <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Delivered</option>
                                </select>
                            </form>
                        </div>
                    </td>
                </tr>
            `
        }).join('');
    }
}