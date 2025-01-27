import { ACTION_TYPE } from "./action-type";

export const setCart = (loadedCartData) => ({
	type: ACTION_TYPE.SET_CART,
	payload: loadedCartData
})