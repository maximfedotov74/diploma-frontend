export type Todo = {
	id: string;
	title: string;
	descr: string;
};

let todos: Todo[] = [];
const listeners = new Set<() => void>();

export const todosStore = {
	addTodo(todo: Todo) {
		todos = [...todos, todo];
		emitChange();
	},

	subscribe(listener: () => void) {
		listeners.add(listener);
		return () => {
			listeners.delete(listener);
		};
	},

	getSnapshot() {
		return todos;
	},
	getServerSnapshot() {
		return todos;
	},
};

const emitChange = () => {
	for (let listener of listeners) {
		listener();
	}
};
