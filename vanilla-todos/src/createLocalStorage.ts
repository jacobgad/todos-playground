export function createLocalStorage<Value>(key: string, initialValue: Value) {
	function set(value: Value) {
		localStorage.setItem(key, JSON.stringify(value));
	}

	function get() {
		const stringValue = localStorage.getItem(key);
		if (!stringValue) return initialValue;
		const value = JSON.parse(stringValue) as Value;
		return value;
	}

	return [get, set] as const;
}
