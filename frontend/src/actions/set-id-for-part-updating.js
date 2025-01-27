import { ACTION_TYPE } from "./action-type";

export const setIdForPartUpdating = (partId) => ({
	type: ACTION_TYPE.SET_PART_ID,
	payload: partId
})