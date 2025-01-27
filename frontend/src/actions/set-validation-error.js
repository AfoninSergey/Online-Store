import { ACTION_TYPE } from './action-type';

export const setValidationError = (value) => ({
	type: ACTION_TYPE.SET_VALIDATION_ERROR,
	payload: value,
});
