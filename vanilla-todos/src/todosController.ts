export type Todo = {
	id: number;
	label: string;
	checked: boolean;
};

type CreateTodosControllerProps = {
	getTodos: () => Todo[];
	setTodos: (todos: Todo[]) => void;
};

export function createTodosController({ getTodos, setTodos }: CreateTodosControllerProps) {
	function updateTodos(newTodos: Todo[]) {
		setTodos(newTodos);
	}

	function addTodo(todo: Todo) {
		updateTodos([...getTodos(), todo]);
	}

	function updateTodo(updatedTodo: Todo) {
		const updatedTodos = getTodos().map((todo) =>
			todo.id === updatedTodo.id ? updatedTodo : todo
		);
		updateTodos(updatedTodos);
	}

	function removeTodo(todoId: Todo['id']) {
		updateTodos(getTodos().filter((todo) => todo.id !== todoId));
	}

	return {
		addTodo,
		removeTodo,
		updateTodo,
	};
}
