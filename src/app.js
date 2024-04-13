// Open Documentation of Alpine Js
// Open in Alpine.data() Section

document.addEventListener('alpine:init', () => {
    Alpine.data('menu', () => ({
        items: [
            { id: 1, name: 'Latte', img: 'latte-1.jpg', price: 25000 },
            { id: 2, name: 'Espresso', img: 'espresso.jpg', price: 20000 },
            { id: 3, name: 'Americano', img: 'americano.jpg', price: 22000 },
            { id: 4, name: 'Mocha', img: 'Mocha.jpg', price: 27500 },
        ],
    }));

    // Integrate 'Menu Product' with 'Cart' feature by the cart button
    Alpine.store('cart', {
        items: [],
        quantity: 0,
        totalPrice: 0,
        // Method to add new item
        add(newItem) {
            // Check if the product already exists in cart
            const cartItem = this.items.find((item) => item.id === newItem.id);

            // IF the product didn't exists
            if(!cartItem) {
                this.items.push({...newItem, quantity: 1, totalPrice: newItem.price });
                this.quantity++;
                this.totalPrice += newItem.price;    
            } else {
                // If the product already exists
                this.items = this.items.map((item) => {
                    // If the product added is different with the product already exists
                    if (item.id !== newItem.id) {
                        return item;
                    } else {
                        // If the product is similar with the product already exists
                        item.quantity++;
                        item.totalPrice = item.price * item.quantity;
                        this.quantity++;
                        this.totalPrice += item.price;
                        return item;
                    }
                })
            }
        },
        remove(id) {
            const cartItem = this.items.find((item) => item.id === id);

            // IF item.quantity more than 1
            if(cartItem.quantity > 1) {
                // Check one by one
                this.items = this.items.map((item) => {
                    // If the id target didn't clicked
                    if(item.id !== id) {
                        return item;
                    } else {
                        item.quantity--;
                        item.totalPrice = item.price * item.quantity;
                        this.quantity--;
                        this.totalPrice -= item.price;
                        return item;
                    }
                })
            }
        },
        // Delete product with trash icon
        delete(id) {
            const deleteItemIndex = this.items.findIndex((item) => item.id === id);
            if (deleteItemIndex !== -1) {
                const deletedItems = this.items.splice(deleteItemIndex, 1) [0];
                this.quantity -= deletedItems.quantity;
                this.totalPrice -= deletedItems.totalPrice;
            }
        }
    })
});

// Convert price into Rupiah format
// Buka di website/google 'IntlNumberFormat'
const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(number);
};


// Customer Form Validation
// VERSI KE 1

// Make the button become disabled
const checkoutButton = document.querySelector('.checkout-button')
checkoutButton.disabled = true;

// Make the button disabled as dynamic (disabled when the form empty/incomplete, then able if the form filled)
const form = document.querySelector('#checkoutForm')

form.addEventListener('keyup', () => {
    for (let i = 0; i < form.elements.length; i++) {
        if (form.elements[i].value.length !== 0) {
            // checkoutButton.classList.remove('disabled');
            checkoutButton.classList.add('disabled');
        } else {
            return false;
        }
    }
    checkoutButton.disabled = false;
    checkoutButton.classList.remove('disabled');
})
// -----------------------//


// VERSI KE 2
// Make the button become disabled
// const checkoutButton = document.querySelector('.checkout-button')

// Make the button disabled as dynamic (disabled when the form empty/incomplete, then able if the form filled)
// const form = document.querySelector('#checkoutForm')

// const checkInputs = () => {
//     let allFilled = true;
//     for (let i = 0; i < form.elements.length; i++) {
//         if (form.elements[i].value.trim() === '') {
//             allFilled = false;
//             break;
//         }
//     }
//     return allFilled;
// };

// Event listener for keyup on form inputs
// form.addEventListener('keyup', () => {
//     const allInputsField = checkInputs();
//     if (allInputsField) {
//         checkoutButton.disabled = false;
//         checkoutButton.classList.remove('disabled');
//     } else {
//         checkoutButton.disabled = true;
//         checkoutButton.classList.add('disabled');
//     }
// });


// Send data (product/items & totalPrice) when checkout(beli) button is clicked
checkoutButton.addEventListener('click', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = new URLSearchParams(formData);
    const objectData = Object.fromEntries(data);
    console.log(objectData);
    // To send message which consists of Customer identity, product id, and the totalPrice of order.
    const message = formatMessage(objectData);
    window.open('http://wa.me/6285942139054?text=' + encodeURIComponent(message))
})

// Format for order message from customer to seller
const formatMessage = (obj) => {
    const items = JSON.parse(obj.items);
    const orderList = items.map((item, index) => `${index + 1}. ${item.name} (${item.quantity} x ${rupiah(item.price)})`).join('\n');
    const totalOrder = rupiah(obj.totalPrice);

    return `--- Data Customer: ---
    Nama: ${obj.name}
    Nomor HP: ${obj.phone}
    Catatan: "${obj.note}"

--- Data Pesanan: ---
    ${orderList}

    Total: ${totalOrder}

    ~ Terima Kasih ~`;
};