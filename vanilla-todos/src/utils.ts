export function getElement<T>(query: string) {
	const element = document.querySelector(query) as T | null;
	if (!element) throw new Error(`${query} not found in document`);
	return element;
}
