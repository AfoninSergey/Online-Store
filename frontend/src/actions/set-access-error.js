import { ACTION_TYPE } from './action-type';

export const setAccessError = (error) => ({
	type: ACTION_TYPE.SET_ACCESS_ERROR,
	payload: error,
});
