import { request } from '../utils';
import { setCombines } from './set-combines';

export const loadCombinesAsync = () => (dispatch) =>
	request('/parts/combines').then(({ response }) => {
		dispatch(setCombines(response));
		return response;
	});
