import items from "./items.json";
import formater from "./util/formatCurrency";

const template = document.querySelector("#cart-item-template");
const cartElement = document.querySelector("[data-cart]");
const cart = document.querySelector("#cart");
const cartBtn = document.querySelector("#cart-button");
const cartTotal = document.querySelector("#cart-total");
const cartNumber = document.querySelector("#cart-number");
const cartData = document.querySelector("#card-data");
const IMAGE_URL = "https://dummyimage.com/210x130/";
const SESSION_STORAGE_PREFIX = 'SHOPPING-CART-cart'


export let cartItems = loadCartItems();

export function setupShoppingCart() {
    cartItems = loadCartItems();
	renderCart();
}

function saveCartItems(){
    sessionStorage.setItem(SESSION_STORAGE_PREFIX, JSON.stringify(cartItems))
}

function loadCartItems(){
    const cart = sessionStorage.getItem(SESSION_STORAGE_PREFIX)
    return JSON.parse(cart) || []
}

function renderCart() {
	if (cartItems.length === 0) {
		hideCart();
	} else {
		showCart();
		renderItemCart();
	}
}
function hideCart() {
	cart.classList.add("invisible");
    cartData.classList.add('invisible')
}
function showCart() {
	cart.classList.remove("invisible");
}
cartBtn.addEventListener("click", e => {
	cartData.classList.toggle("invisible");
});

function renderItemCart() {
	cartElement.innerHTML = "";

	cartItems.forEach(entry => {
		const item = items.find(i => entry.id == i.id);
		const cartItem = template.content.cloneNode(true);

		cartItem.querySelector("[data-cart-item]").dataset.cartItem = item.id;

		cartItem.querySelector("[data-item-name]").innerText = item.name;
		cartItem.querySelector("[data-item-price]").innerText = formater(
			(item.priceCents * entry.quantity) / 100
		);

		if (entry.quantity > 1) {
			cartItem.querySelector(
				"[data-item-quantity]"
			).innerText = `x${entry.quantity}`;
		}

		cartItem.querySelector(
			"[data-item-image]"
		).src = `${IMAGE_URL}${item.imageColor}/${item.imageColor}`;

		cartElement.appendChild(cartItem);
	});

	cartNumber.innerText = cartItems.length;

	const total = cartItems.reduce((sum, entry) => {
		const item = items.find(i => entry.id == i.id);
		return sum + item.priceCents * entry.quantity;
	}, 0);
	cartTotal.innerText = formater(total / 100);
}

cartElement.addEventListener("click", e => {
	if (!e.target.matches("[data-remove-from-cart-button]")) return;
	removeFromCart(e.target.closest("[data-cart-item]").dataset.cartItem);
});

function removeFromCart(id) {
	const existingItem = cartItems.find(entry => entry.id == id);
	if (existingItem == null) return;
	cartItems = cartItems.filter(item => item.id != id);
	renderCart();
    saveCartItems();
}

export function addToCart(id) {
	const existingItem = cartItems.find(entry => entry.id == id);
	if (existingItem) {
		existingItem.quantity++;
	} else {
		cartItems.push({ id: id, quantity: 1 });
	}
	renderCart();
    saveCartItems();
}
