import { ACTION_TYPE } from "./action-type";

export const updateChangedPart = (changedPartData) => ({
	type: ACTION_TYPE.UPDATE_CHANGED_PART,
	payload: changedPartData
})