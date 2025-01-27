import { ERROR_MESSAGE } from '../constants';
import { request } from '../utils';
import { setServerError } from './set-server-error';

export const savePartDataAsync =
	(partId, updatedPart) => (dispatch) =>
		request(`/parts/edit/${partId}`, 'PATCH', updatedPart).then(
			({ error, response }) => {
				if (error !== null) {
					dispatch(setServerError(error));
				} else if (response.id === undefined) {
					dispatch(setServerError(ERROR_MESSAGE.SERVER_LONG));
				}
				return { error, response };
			},
		);
