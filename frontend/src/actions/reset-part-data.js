import { ACTION_TYPE } from "./action-type";

export const resetPartData = (initialPart) => ({

	type: ACTION_TYPE.RESET_PART_DATA,
	payload: initialPart
})