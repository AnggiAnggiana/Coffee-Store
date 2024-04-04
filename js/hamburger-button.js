// Toggle class active (Hamburger Button)
const navbarNav = document.querySelector('.navbar-nav');

// If hamburger button is clicked
document.querySelector('#hamburger-menu').onclick = (e) => {
    navbarNav.classList.toggle('active');
    e.preventDefault();
};

// Close nav when hamburger is clicked outside sidebar
const hamburger = document.querySelector('#hamburger-menu');

document.addEventListener('click', function (e) {
    if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove('active')
    }
})


// Toggle class active (Search Form)
const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');

document.querySelector('#searchButton').onclick = (e) => {
    searchForm.classList.toggle('active');
    searchBox.focus();
    e.preventDefault();
};

// Close SearchForm when user click outside searchform
const searchClose = document.querySelector('#searchButton');

document.addEventListener('click', function (e) {
    if (!searchClose.contains(e.target) && !searchForm.contains(e.target)) {
        searchForm.classList.remove('active')
    }
})

// Toggle class active (Shopping Cart)
const shoppingCart = document.querySelector('.shopping-cart')

document.querySelector('#shopping-cart').onclick = (e) => {
    shoppingCart.classList.toggle('active');
    e.preventDefault();
}

// Close ShoppingCart when user click outside ShoppingCart area
const closeCart = document.querySelector('#shopping-cart');

document.addEventListener('click', (e) => {
    if (!closeCart.contains(e.target) && !shoppingCart.contains(e.target)) {
        shoppingCart.classList.remove('active')
    }
})