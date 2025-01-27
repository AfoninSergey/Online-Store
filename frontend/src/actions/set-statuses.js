import { ACTION_TYPE } from './action-type';

export const setStatuses = (loadedStatuses) => ({
	type: ACTION_TYPE.SET_STATUSES,
	payload: loadedStatuses,
});
