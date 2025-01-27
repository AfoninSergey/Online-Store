import { ACTION_TYPE } from '../actions';
import { SORTING_ORDER } from '../constants';
import { sortByAlphabet } from '../utils';

const initialPartsState = {
	partList: [],
	idForPartUpdating: null,
	updatePartsTrigger: false,
};
export const partsReducer = (state = initialPartsState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.SET_PARTS:
			return { ...state, partList: [...payload] };
		case ACTION_TYPE.UPDATE_CHANGED_PART:
			return {
				...state,
				partList: state.partList.map((part) =>
					part.id === payload.id
						? { ...part, [payload.name]: payload.value }
						: part,
				),
			};

		case ACTION_TYPE.RESET_PART_DATA:
			return {
				...state,
				partList: state.partList.map((part) =>
					part.id === payload.id ? payload : part,
				),
			};
		case ACTION_TYPE.DELETE_PART:
			return {
				...state,
				partList: state.partList.filter((part) => part.id !== payload),
			};
		case ACTION_TYPE.ADD_NEW_PART: {
			const sortedPartListWithNewPart = sortByAlphabet(
				SORTING_ORDER.DESCENDING,
				[...state.partList, payload],
				'name',
			);

			return {
				...state,
				partList: sortedPartListWithNewPart,
			};
		}
		case ACTION_TYPE.SET_PART_ID:
			return { ...state, idForPartUpdating: payload };
		case ACTION_TYPE.CHANGE_UPDATE_PARTS_TRIGGER:
			return {
				...state,
				updatePartsTrigger: !state.updatePartsTrigger,
			};
		default:
			return state;
	}
};
