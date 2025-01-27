export const search = (array, searchString, searchingValue) =>
	array.filter((item) =>
		item[searchingValue].toLowerCase().includes(searchString.toLowerCase()),
	);
