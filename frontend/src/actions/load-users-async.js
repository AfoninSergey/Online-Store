import { request } from '../utils';
import { setServerError } from './set-server-error';
import { setUsers } from './set-users';

export const loadUsersAsync = () => (dispatch) =>
	request('/users').then(({ error, response }) => {
		if (error !== null) {
			dispatch(setServerError(error));
			return { successfully: false };
		} else {
			dispatch(setUsers(response));
			return response;
		}
	});
