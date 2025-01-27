import { ERROR_MESSAGE } from '../constants';

export const validateRepeatPassword = (password, repetPassword, isReg) =>
	password === repetPassword || !isReg ? null : ERROR_MESSAGE.PASSWORD_REPEAT;
