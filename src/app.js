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