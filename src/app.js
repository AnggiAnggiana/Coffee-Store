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