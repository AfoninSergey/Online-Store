import { ACTION_TYPE } from './action-type';

export const addNewPart = (newPart) => ({
	type: ACTION_TYPE.ADD_NEW_PART,
	payload: newPart,
});
