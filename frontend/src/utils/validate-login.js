import { ERROR_MESSAGE, REG_EXP } from '../constants';

export const validateLogin = (value) => {
	let error = null;

	if (!REG_EXP.LOGIN.test(value)) {
		error = ERROR_MESSAGE.LOGIN;
	} else if (value.length > 20) {
		error = ERROR_MESSAGE.LOGIN_LONG;
	}

	return error;
};
