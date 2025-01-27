import { request } from '../utils';
import { deleteUser } from './delete-user';

export const removeUserAsync = (userId) => (dispatch) =>
	request(`/users/${userId}`, 'DELETE').then(({ error, response }) => {
		if (error === null && response) {
			dispatch(deleteUser(userId));
		}
		return { error, response };
	});
