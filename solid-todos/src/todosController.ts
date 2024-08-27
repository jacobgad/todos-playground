export type Todo = {
	id: number;
	label: string;
	checked: boolean;
};

type TodosControllerProps = {
	todos: () => Todo[];
	setTodos: (todos: Todo[]) => void;
};

export default function todosController({ todos, setTodos }: TodosControllerProps) {
	function addTodo(label: string) {
		setTodos([...todos(), { id: Date.now(), label, checked: false }]);
	}

	function updateTodo(updatedTodo: Todo) {
		setTodos(todos().map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)));
	}

	function removeTodo(todoId: number) {
		setTodos(todos().filter((todo) => todo.id !== todoId));
	}

	return { addTodo, updateTodo, removeTodo };
}
