import items from "./items.json";
import { addToCart, cartItems, setupShoppingCart } from "./shoppingCart";
import formater from "./util/formatCurrency.js";

const template = document.querySelector("#store-item-template");
const itemContainer = document.querySelector("#item-container");

export function setupStore() {
	document.addEventListener("click", e => {
		if (!e.target.matches("[data-add-to-cart]")) return;
		addToCart(e.target.closest("[data-store-item]").dataset.storeItem);
	});
	// fetch is not working with parcel
	// fetch("items.json").then(res => {return res.json();}).then(json => console.log(json));

	items.forEach(renderStoreItem);
}

 const IMAGE_URL = "https://dummyimage.com/420x260/";

function renderStoreItem(item) {
	if (itemContainer == null) return
	const storeItem = template.content.cloneNode(true);
	storeItem.querySelector("[data-store-item]").dataset.storeItem = item.id;
	storeItem.querySelector("[data-item-category]").innerText = item.category;
	storeItem.querySelector(
		"[data-item-image]"
	).src = `${IMAGE_URL}${item.imageColor}/${item.imageColor}`;
	storeItem.querySelector("[data-item-name]").innerText = item.name;

	storeItem.querySelector("[data-price-cents]").innerText = `$${(
		item.priceCents / 100
	).toFixed(2)}`;
	// awesome way of converting amount to currency
	storeItem.querySelector("[data-price-cents]").innerText = formater(
		item.priceCents / 100
	);

	itemContainer.appendChild(storeItem);
}
