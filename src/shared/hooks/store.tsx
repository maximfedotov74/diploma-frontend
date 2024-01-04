import { useSyncExternalStore } from 'react';

export const incrementAction = (key: string) => {
	const state = store.getState();
	store.setState({
		...state,
		[key]: state[key] + 1,
	});
};

export const decrementAction = (key: string) => {
	const state = store.getState();
	store.setState({
		...state,
		[key]: state[key] - 1,
	});
};

function createStore(initialState: any) {
	let currentState = initialState;
	const listeners = new Set<any>();
	return {
		getState: () => currentState,
		setState: (newState: any) => {
			currentState = newState;
			listeners.forEach(listener => listener(currentState));
		},
		subscribe: (listener: any) => {
			listeners.add(listener);
			return () => listeners.delete(listener);
		},
		getServerState: () => initialState,
	};
}

const store = createStore({
	value1: 0,
	value2: 0,
});

export default store;

export const useStore = (selector = (state: any) => state) =>
	useSyncExternalStore(
		store.subscribe,
		() => selector(store.getState()),
		() => selector(store.getServerState())
	);
