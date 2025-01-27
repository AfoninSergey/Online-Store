import { ACTION_TYPE } from './action-type';

export const setRepeatPasswordValue = (value) => ({
	type: ACTION_TYPE.SET_REPEAT_PASSWORD,
	payload: value,
});
