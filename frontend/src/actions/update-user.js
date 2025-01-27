import { ACTION_TYPE } from "./action-type";

export const updateUser = (updatedUser) => ({
	type: ACTION_TYPE.UPDATE_USER,
	payload: updatedUser
})