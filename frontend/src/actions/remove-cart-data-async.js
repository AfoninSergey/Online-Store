import { request } from '../utils';
import { RESET_CART } from './reset-cart';

export const removeCartDataAsync = (cartId) => (dispatch) =>
	request(`/cart/${cartId}`, 'DELETE').then(({ error, response }) => {
		if (error === null && response) {
			dispatch(RESET_CART);
		}
		return { error, response };
	});
