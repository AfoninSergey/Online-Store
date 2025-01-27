import { request } from '../utils';
import { updateUser } from './update-user';

export const saveUserDataAsync = (userId, statusId, amount) => (dispatch) =>
	request(`/users/${userId}`, 'PATCH', { statusId, amount }).then(
		({ error, response }) => {
			if (
				error === null &&
				response.amount !== undefined &&
				response.statusId !== undefined
			) {
				dispatch(updateUser(response));
			}
			return { error, response };
		},
	);
