import { ACTION_TYPE } from '../actions';

const initialCartState = {
	selectedParts: [],
	totalNumber: 0,
	totalAmount: '0.00',
	cartDataOnServer: false,
};
export const cartReducer = (state = initialCartState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.SET_CART:
			return {
				...state,
				...payload,
				cartDataOnServer: true,
			};
		case ACTION_TYPE.RESET_CART:
			return initialCartState;
		default:
			return state;
	}
};
