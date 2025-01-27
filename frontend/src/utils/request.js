export function request(url, method, data) {
	return fetch('/api' + url, {
		headers: {
			'Content-Type': 'Application/json; Charset=UTF-8',
		},
		method: method || 'GET',
		body: data ? JSON.stringify(data) : undefined,
	}).then((response) => response.json())
}
