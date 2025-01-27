import { ACTION_TYPE } from "./action-type";

export const setParts = (loadedParts) => ({
	type: ACTION_TYPE.SET_PARTS,
	payload: loadedParts
})