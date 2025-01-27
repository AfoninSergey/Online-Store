import { ACTION_TYPE } from "./action-type";

export const deletePart = (partId) => ({
	type: ACTION_TYPE.DELETE_PART,
	payload: partId
})