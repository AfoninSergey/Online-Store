import { ERROR_MESSAGE, REG_EXP } from '../constants';

export const validatePassword = (value) => {
	let error = null;

	if (!REG_EXP.PASSWORD.test(value)) {
		error = ERROR_MESSAGE.PASSWORD;
	} else if (value.length > 30) {
		error = ERROR_MESSAGE.PASSWORD_LONG;
	}

	return error;
};
