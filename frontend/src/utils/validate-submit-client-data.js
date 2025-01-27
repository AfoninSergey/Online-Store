import { ERROR_MESSAGE } from '../constants';

export const validateSubmitClientData = (login, password, repeatPassword, isReg) => {
	let error = null;

	const required = isReg
		? login.length === 0 || password.length === 0 || repeatPassword.length === 0
		: login.length === 0 || password.length === 0;

	if (required) {
		error = ERROR_MESSAGE.REG_AUTH_REQUIRED;
	} else if (login.length < 3) {
		error = ERROR_MESSAGE.LOGIN_SHORT;
	} else if (password.length < 3) {
		//TODO Для тестирования. исправить потом 3 на 7!
		error = ERROR_MESSAGE.PASSWORD_SHORT;
	}

	return error;
};
