import { ACTION_TYPE } from './action-type';

export const setPasswordValue = (value) => ({
	type: ACTION_TYPE.SET_PASSWORD,
	payload: value,
});
