import { ERROR_MESSAGE } from '../constants';
import { request } from '../utils';
import { deletePart } from './delete-part';
import { setIdForPartUpdating } from './set-id-for-part-updating';
import { setServerError } from './set-server-error';

export const removePartAsync = (partId) => (dispatch) =>
	request(`/parts/${partId}`, 'DELETE').then(({ error, response }) => {
		if (error !== null) {
			dispatch(setServerError(error));
		} else if (!response) {
			dispatch(setServerError(ERROR_MESSAGE.SERVER_LONG));
		} else {
			dispatch(deletePart(partId));
			dispatch(setIdForPartUpdating(partId));
			return { successfully: true };
		}
	});
