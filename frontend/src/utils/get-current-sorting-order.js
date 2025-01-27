import { SORTING_ORDER } from '../constants';

export const getCurrentSortingOrder = (sortingOrder, setSortingOrder) => {
	switch (sortingOrder) {
		case SORTING_ORDER.NOT_APPLIED: {
			setSortingOrder(SORTING_ORDER.DESCENDING);
			return SORTING_ORDER.DESCENDING;
		}
		case SORTING_ORDER.DESCENDING: {
			setSortingOrder(SORTING_ORDER.ASCENDING);
			return SORTING_ORDER.ASCENDING;
		}
		default: {
			setSortingOrder(SORTING_ORDER.NOT_APPLIED);
			return SORTING_ORDER.NOT_APPLIED;
		}
	}
};
