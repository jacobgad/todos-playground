import { createEffect, createSignal } from 'solid-js';

export function createLocalStorage<Value>(key: string, initialValue: Value) {
	const [value, setValue] = createSignal<Value>(getLocalStorageValue(initialValue));

	createEffect(() => {
		localStorage.setItem(key, JSON.stringify(value()));
	});

	function getLocalStorageValue(initialValue: Value) {
		const stringValue = localStorage.getItem(key);
		if (!stringValue) return initialValue;
		const value = JSON.parse(stringValue) as Value;
		return value;
	}

	return [value, setValue] as const;
}
