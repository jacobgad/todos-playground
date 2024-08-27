import { createSignal, For } from 'solid-js';
import useTodos, { Todo } from './todosController';
import { createLocalStorage } from './createLocalStorage';

export default function App() {
	const [label, setLabel] = createSignal('');
	const [todos, setTodos] = createLocalStorage<Todo[]>('todos', []);
	const { addTodo, removeTodo, updateTodo } = useTodos({ todos, setTodos });

	function handleSubmit(e: Event) {
		e.preventDefault();
		addTodo(label());
		setLabel('');
	}

	return (
		<>
			<h1>Todos</h1>
			<form onSubmit={handleSubmit}>
				<input type="text" value={label()} onInput={(e) => setLabel(e.target.value)} />
				<button type="submit" disabled={!label()}>
					Add
				</button>
			</form>

			<ul class="list">
				<For each={todos()}>
					{(todo) => (
						<li class="todo">
							<input
								type="checkbox"
								checked={todo.checked}
								onChange={(e) => updateTodo({ ...todo, checked: e.target.checked })}
							/>
							<span class={todo.checked ? 'checked' : undefined}>{todo.label}</span>
							<button onClick={() => removeTodo(todo.id)}>&#10005;</button>
						</li>
					)}
				</For>
			</ul>
		</>
	);
}
