import { useSyncExternalStore } from 'react';

export function setAuthModalOpened(opened: boolean) {
	store.setState(opened);
}

function createStore(initialState: boolean) {
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

const store = createStore(false);

export default store;

export function useAuthModalStore(selector = (state: boolean) => state) {
	return useSyncExternalStore(
		store.subscribe,
		() => selector(store.getState()),
		() => selector(store.getServerState())
	);
}
