import { createLocalStorage } from './createLocalStorage';
import { createTodosController, Todo } from './todosController';
import { getElement } from './utils';

const form = getElement<HTMLFormElement>('form');
const input = getElement<HTMLInputElement>('input');
const addButton = getElement<HTMLButtonElement>('#add-button');

const [getTodos, setTodos] = createLocalStorage<Todo[]>('todos', []);

renderTodos(getTodos());

const todos = createTodosController({
	getTodos,
	setTodos: (todos) => {
		setTodos(todos);
		renderTodos(todos);
	},
});

form.addEventListener('submit', (event) => {
	event.preventDefault();
	if (!input.value.length) return;
	todos.addTodo({ id: Date.now(), label: input.value, checked: false });
	input.value = '';
});

addButton.disabled = true;

input.addEventListener('input', (event) => {
	const element = event.target as HTMLInputElement;
	if (element.value.length) {
		addButton.disabled = false;
	} else {
		addButton.disabled = true;
	}
});

function renderTodos(todos: Todo[]) {
	const list = document.querySelector('ul');
	if (!list) throw new Error('List not found');
	list.replaceChildren(...todos.map((todo) => createTodoElement(todo)));
}

type createCheckboxProps = {
	checked: boolean;
	onChange: (current: boolean) => void;
};

function createCheckbox({ checked, onChange }: createCheckboxProps) {
	const checkbox = document.createElement('input');
	checkbox.type = 'checkbox';
	checkbox.checked = checked;
	checkbox.addEventListener('change', () => {
		onChange(checkbox.checked);
	});
	return checkbox;
}

function createDeleteButton(onClick: () => void) {
	const button = document.createElement('button');
	button.innerText = 'X';
	button.addEventListener('click', onClick);
	return button;
}

function createTodoElement(todo: Todo) {
	const li = document.createElement('li');
	li.classList.add('todo');
	const span = document.createElement('span');
	span.innerText = todo.label;
	if (todo.checked) span.classList.add('checked');
	const checkbox = createCheckbox({
		checked: todo.checked,
		onChange: () => todos.updateTodo({ ...todo, checked: !todo.checked }),
	});
	const button = createDeleteButton(() => todos.removeTodo(todo.id));
	li.append(checkbox, span, button);
	return li;
}
