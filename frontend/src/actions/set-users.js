import { ACTION_TYPE } from './action-type';

export const setUsers = (loadedUsers) => ({
	type: ACTION_TYPE.SET_USERS,
	payload: loadedUsers,
});
