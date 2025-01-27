import { ACTION_TYPE } from "./action-type";

export const setSuccessInfo = (text) =>({
	type: ACTION_TYPE.SET_SUCCESS_INFO,
	payload: text
})