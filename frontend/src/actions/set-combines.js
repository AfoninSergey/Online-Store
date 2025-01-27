import { ACTION_TYPE } from "./action-type";

export const setCombines = (loadedCombines) => ({
	type: ACTION_TYPE.SET_COMBINES,
	payload: loadedCombines
})