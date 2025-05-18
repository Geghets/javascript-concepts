// Description: Simulates a shopping cart flow using JavaScript Promises
// Concepts Covered:
// - Promise creation
// - Promise chaining
// - Conditional resolve/reject
// - Updating variables within async flows

function generateRandomCode(length) {
    let code = '';
    for (let i = 0; i < length; i++) {
        code += (Math.floor(Math.random() * 9) + 1).toString();
    }
    return code;
}

const cart = [
    {item: 'shoes', name: 'Shoes', price: 75},
    {item: 't-shirt', name: 'T shirt', price: 15},
    {item: 'trousers', name: 'Trousers', price: 30},
];
let walletBalance = 150;

function createOrder(cart) {
    const orderStatus = new Promise((resolve, reject) => {
        if (cart.length) {
            const cartData = {
                id: generateRandomCode(5),
                cart: cart,
            }
            resolve({order: cartData, message: 'You want to order: ' + cart.map(item => item.name).join(', ') + '.'});
        } else {
            const err = new Error('Your cart is empty!');
            reject(err);
        }
    });

    return orderStatus
}

function proceedToPayment(order) {
    let totalAmount = 0;
    for (let product of order.cart) {
        totalAmount += product.price;
    }
    const paymentStatus = new Promise((resolve, reject) => {
        if (walletBalance >= totalAmount) {
            order['total'] = totalAmount;
            resolve({order: order, message: 'Your wallet balance is ' + totalAmount + '$ and it is enough'});
        } else {
            const err = new Error('Oops you dont have enough Money!');
            reject(err);
        }
    });

    return paymentStatus
}

function showOrderSummery (order) {
    const summary = new Promise((resolve, reject) => {
        if (order) {
            resolve({
                message: `Your order total is ${order.total}$ and you wallet balance is ${walletBalance}$ after purchase you will have ${walletBalance - order.total}$`,
                order: order
            });
        }
    })

    return summary
}

function updateWallet(order) {
    const updateAmount = new Promise((resolve) => {
        walletBalance = walletBalance - order.total;
        resolve(`Purchase was successful and wallet was successfully updated balance is ${walletBalance}$!`);
    });

    return updateAmount;
}

createOrder(cart).then(order => {
    console.log(order.message);
    return proceedToPayment(order.order);
}).then(total => {
    console.log(total.message);
    return showOrderSummery(total.order)
}).then(summary => {
    console.log(summary.message);
    return updateWallet(summary.order);
}).then(update => {
    console.log(update);
}).catch(error => {
    console.log(error);
});
