module.exports = (array, sortingValue) =>
	[...array].sort((a, b) => a[sortingValue].localeCompare(b[sortingValue]));