import { RESET_AUTH_AND_REG_FORM } from './reset-auth-and-reg-form';
import { setCart } from './set-cart';
import { setServerError } from './set-server-error';
import { setStatuses } from './set-statuses';
import { setUser } from './set-user';
import { request } from '../utils';

export const authorizeOrRegisterAsync =
	(isReg, login, password) => (dispatch) => {
		const url = isReg ? '/register' : '/login';

		return request(url, 'POST', {login, password}).then(
			({ error, response }) => {
				if (error) {
					dispatch(setServerError(`Ошибка запроса! ${error}`));
					dispatch(RESET_AUTH_AND_REG_FORM);
					return { successfully: false };
				} else {
					dispatch(setUser(response.loadedUser));

					sessionStorage.setItem(
						'currentUserData',
						JSON.stringify(response.loadedUser),
					);
					dispatch(setStatuses(response.loadedStatuses));
					sessionStorage.setItem(
						'loadedStatuses',
						JSON.stringify(response.loadedStatuses),
					);
					if (response.cart && Object.keys(response.cart).length !== 0) {
						dispatch(setCart(response.cart));
						sessionStorage.setItem(
							'currentUserCartData',
							JSON.stringify(response.cart),
						);
					}
					dispatch(RESET_AUTH_AND_REG_FORM);
					return { successfully: true };
				}
			},
		);
	};
