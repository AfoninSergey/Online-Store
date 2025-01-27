import { ERROR_MESSAGE } from '../constants';

export const validateSubmitNewPartData = ({ article, name, price }) => {
	let error = null;

	if (article.length === 0 || name.length === 0 || price.length === 0) {
		error = ERROR_MESSAGE.NEW_PART_REQUIRED
	}

	return error;
};
