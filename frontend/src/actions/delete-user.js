import { ACTION_TYPE } from "./action-type";

export const deleteUser = (userId) => ({
	type: ACTION_TYPE.DELETE_USER,
	payload: userId
})