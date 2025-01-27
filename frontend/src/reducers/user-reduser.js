import { ACTION_TYPE } from '../actions';
import { ROLE } from '../constants';

const initialUserState = {
	id: null,
	login: null,
	roleId: ROLE.GUEST,
	statusId: null,
	amount: null,
	status: null,
};
export const userReduser = (state = initialUserState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.SET_USER:
			return {
				...state,
				...payload,
			};
		case ACTION_TYPE.LOGOUT:
			return initialUserState;
		default:
			return state;
	}
};
