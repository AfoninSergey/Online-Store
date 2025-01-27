import { request } from '../utils';
import { setParts } from './set-parts';

export const loadPartsAsync = () => (dispatch) =>
	request('/parts').then(({ response }) => {
		dispatch(setParts(response));
		return response;
	});
