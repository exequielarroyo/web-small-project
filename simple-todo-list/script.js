// select all elements
const form = document.querySelector("#new-item-form");
const list = document.querySelector(".list");
const input = document.querySelector("#item-input");

// when i submit a form create new item on the list
form.addEventListener("submit", e => {
	e.preventDefault();
	const newItem = document.createElement("div");
	newItem.classList.add("list-item");

	newItem.addEventListener("click", e => {
		newItem.remove();
	});

	if (input.value == "") return;
	newItem.innerText = input.value;
	list.append(newItem);
	input.value = "";
});
