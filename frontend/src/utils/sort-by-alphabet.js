import { SORTING_ORDER } from '../constants';

export const sortByAlphabet = (sortingOrder, array, sortingValue) => {
	switch (sortingOrder) {
		case SORTING_ORDER.DESCENDING:
			return [...array].sort((a, b) => a[sortingValue].localeCompare( b[sortingValue]));
		case SORTING_ORDER.ASCENDING:
			return [...array].sort((a, b) => b[sortingValue].localeCompare( a[sortingValue]));
		default:
			return array;
	}
};
