import { SORTING_ORDER } from '../constants';

export const sortByNumber = (sortingOrder, array, sortingValue) => {
	switch (sortingOrder) {
		case SORTING_ORDER.DESCENDING:
			return [...array].sort((a, b) => a[sortingValue] - b[sortingValue]);

		case SORTING_ORDER.ASCENDING:
			return [...array].sort((a, b) => b[sortingValue] - a[sortingValue]);

		default:
			return array;
	}
};
