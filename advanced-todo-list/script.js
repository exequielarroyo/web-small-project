const form = document.querySelector("#new-todo-form");
const template = document.querySelector("#list-item-template");
const input = document.getElementById("todo-input");
const list = document.getElementById("list");
const APP_NAME = "ADVANCED-TODO-LIST-";
const KEY_TODOS = APP_NAME + "todos";

let todos = loadTodos();
todos.forEach(renderTodo);

form.addEventListener("submit", e => {
	e.preventDefault();
	const todoName = input.value;
	if (todoName === "") return;
	const newTodo = {
		name: `${todoName}`,
		complete: false,
		id: new Date().valueOf().toString()
	};
	todos.push(newTodo);
	renderTodo(newTodo);
	saveTodos();
	input.value = "";
});

function renderTodo(todo) {
	const templateTodo = template.content.cloneNode(true);
	const itemLabel = templateTodo.querySelector("[data-list-item-text]");
	const input = templateTodo.querySelector('input[type="checkbox"]');
	const listItem = templateTodo.querySelector(".list-item");
	listItem.dataset.todoId = todo.id;
	itemLabel.innerText = todo.name;
	input.checked = todo.complete;
	list.appendChild(templateTodo);
}

function saveTodos() {
	localStorage.setItem(KEY_TODOS, JSON.stringify(todos));
}

function loadTodos() {
	const todoString = localStorage.getItem(KEY_TODOS);
	return JSON.parse(todoString) || [];
}

list.addEventListener("change", e => {
	if (!e.target.matches("[data-list-item-checkbox]")) return;
	const parent = e.target.closest(".list-item");
	const todoId = parent.dataset.todoId;
	const todo = todos.find(todo => todo.id == todoId);
	todo.complete = e.target.checked;
	saveTodos();
});

list.addEventListener("click", e => {
	if (!e.target.matches("[data-button-delete]")) return;
	const parent = e.target.closest(".list-item");
	const todoId = parent.dataset.todoId;
	parent.remove();
	todos = todos.filter(todo => todo.id !== todoId);
	saveTodos();
});
