import { ACTION_TYPE } from './action-type';

export const setIsLoading = (value) => ({
	type: ACTION_TYPE.SET_IS_LOADING,
	payload: value,
});
