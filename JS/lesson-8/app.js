'use strict';

let fitlerPopup = document.querySelector('.filterPopup');
let fitlerLabel = document.querySelector('.filterLabel');
let filterIcon = document.querySelector('.filterIcon');

fitlerLabel.addEventListener('click', function () {
    fitlerPopup.classList.toggle('hidden');
    fitlerLabel.classList.toggle('filterLabelPink');
    filterIcon.classList.toggle('filterIconPink');

    if (filterIcon.getAttribute('src') === 'images/filter.svg') {
        filterIcon.setAttribute('src', 'images/filterHover.svg')
    } else {
        filterIcon.setAttribute('src', 'images/filter.svg')
    }
});

let filterHeaders = document.querySelectorAll('.filterCategoryHeader');
filterHeaders.forEach(function (header) {
    header.addEventListener('click', function (event) {
        event.target.nextElementSibling.classList.toggle('hidden');
    })
});

let filterSizes = document.querySelector('.filterSizes');
let filterSizeWrap = document.querySelector('.filterSizeWrap');
filterSizeWrap.addEventListener('click', function () {
    filterSizes.classList.toggle('hidden');
});










const shoppingCart = {};

const totalValueEl = document.querySelector('.basketTotalValue');

const cartIconEl = document.querySelector('div .cartIconWrap > span');

const cartTotalEl = document.querySelector('.basketTotal');
const cartEl = document.querySelector('.basket');

document.querySelector('.cartIconWrap').addEventListener(
    'click', () => {
        cartEl.classList.toggle('hidden');
    });

document.body.addEventListener('click', event => {
    const buttonEl = event.target;
    if (!buttonEl.parentElement.closest('.buyButton')) {
        return;
    }
    const dataItemEl = buttonEl.closest('div .featuredItem');
    const priсeEl = dataItemEl.querySelector('.featuredPrice');

    const id = +dataItemEl.dataset.id;

    const name = dataItemEl.querySelector('.featuredName').textContent;

    const price = parseFloat(
        priсeEl.textContent.match(/(\d+).(\d+)/)[0]).toFixed(2);

    addToCart(id, name, price);
});

function addToCart(id, name, price) {
    if (!(id in shoppingCart)) {
        shoppingCart[id] = { id: id, name: name, price: price, count: 0 };
    }

    shoppingCart[id].count++;

    cartIconEl.textContent = getTotalGoodsCount().toString();

    totalValueEl.textContent = getTotalCartPrice().toFixed(2);

    renderProductInBasket(id);
}

function getTotalGoodsCount() {
    return Object.values(shoppingCart).reduce((
        acc, product) => acc + product.count, 0);
}

function getTotalCartPrice() {
    return Object
        .values(shoppingCart)
        .reduce((acc, product) => acc + product.price * product.count, 0);
}


function renderProductInBasket(productId) {
    const cartRowEl = cartEl
        .querySelector(`.basketRow[data-id="${productId}"]`);
    if (!cartRowEl) {
        const productRow = `
        <div class="basketRow" data-id="${productId}">
        <div>${shoppingCart[productId].name}</div>
        <div>
            <span class="productCount">${shoppingCart[productId].count}</span> шт.
        </div>
        <div>$${shoppingCart[productId].price}</div>
        <div>
            $<span class="productTotalRow">${(shoppingCart[productId].price *
                shoppingCart[productId].count).toFixed(2)}</span>
        </div>
        </div>
        `;
        cartTotalEl.insertAdjacentHTML("beforebegin", productRow);
        return;
    }

    const product = shoppingCart[productId];

    cartRowEl.querySelector('.productCount').textContent = product.count;

    cartRowEl
        .querySelector('.productTotalRow')
        .textContent = (product.price * product.count).toFixed(2);
}