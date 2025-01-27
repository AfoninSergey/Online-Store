import { ACTION_TYPE } from './action-type';

export const setUser = (loadedUser) => ({
	type: ACTION_TYPE.SET_USER,
	payload: loadedUser,
});
