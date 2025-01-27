import { ERROR_MESSAGE } from '../constants';
import { request } from '../utils';
import { CHANGE_UPDATE_PARTS_TRIGGER } from './change-update-parts-trigger';
import { setServerError } from './set-server-error';

export const savePartsDataAsync = (arrayOfChangedParts) => (dispatch) =>
	request('/parts/edit', 'PATCH', arrayOfChangedParts).then(
		({ error, response }) => {
			if (error !== null) {
				dispatch(setServerError(error));
			} else if (response.some(({ article }) => article === undefined)) {
				dispatch(setServerError(ERROR_MESSAGE.SERVER_LONG));
			} else {
				dispatch(CHANGE_UPDATE_PARTS_TRIGGER);
				return { updatedSuccessfully: true };
			}
		},
	);
