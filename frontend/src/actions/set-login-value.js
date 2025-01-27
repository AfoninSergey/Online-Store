import { ACTION_TYPE } from './action-type';

export const setLoginValue = (value) => ({
	type: ACTION_TYPE.SET_LOGIN,
	payload: value,
});
