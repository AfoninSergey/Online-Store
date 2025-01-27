import { ACTION_TYPE } from './action-type';

export const setServerError = (value) => ({
	type: ACTION_TYPE.SET_SERVER_ERROR,
	payload: value,
});
