import { request } from '../utils';
import { addNewPart } from './add-new-part';
import { setServerError } from './set-server-error';

export const addNewPartAsync = (newPartData) => (dispatch) =>
	request('/parts/add', 'POST', newPartData).then(({ error, response }) => {
		if (error !== null) {
			dispatch(setServerError(error));
			return { successfully: false };
		} else {
			dispatch(addNewPart(response));
			return { successfully: true };
		}
	});
