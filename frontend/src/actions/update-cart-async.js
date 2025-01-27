import { request } from '../utils';
import { setCart } from './set-cart';

export const updateCartAsync = (cartData) => (dispatch) => {
	const url = cartData.cartDataOnServer
			? `${'/cart'}/${cartData.id}`
			: '/cart';
	const method = cartData.cartDataOnServer ? 'PUT' : 'POST';

	return request(url, method, cartData).then(({ error, response }) => {
		if (error) return {error, response: null};

		dispatch(setCart(response));
		return { error, response }
	});
};
