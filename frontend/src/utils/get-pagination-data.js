export const getPaginationData = (arr, maxItems, currentPage) => {
	if (arr.length <= maxItems)
		return {
			isPagination: false,
			list: arr,
			totalPages: 0
		};

	return {
		isPagination: true,
		list: [...arr].splice(currentPage * maxItems - maxItems, maxItems),
		totalPages: Math.ceil(arr.length / maxItems),
	};
};
