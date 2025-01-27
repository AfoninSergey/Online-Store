import { ACTION_TYPE } from '../actions';

const initialUsersState = {
	userList: [],
	updateUsersTrigger: false,
};

export const usersRsducer = (state = initialUsersState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.SET_USERS:
			return { ...state, userList: [...payload] };
		case ACTION_TYPE.UPDATE_USER:
			return {
				...state,
				userList: state.userList.map((user) =>
					user.id === payload.id ? { ...payload } : user,
				),
			};
		case ACTION_TYPE.DELETE_USER:
			return {
				...state,
				userList: state.userList.filter((user) => user.id !== payload),
			};
		case ACTION_TYPE.CHANGE_UPDATE_USERS_TRIGGER:
			return {
				...state,
				updateUsersTrigger: !state.updateUsersTrigger,
			};
		default:
			return state;
	}
};
