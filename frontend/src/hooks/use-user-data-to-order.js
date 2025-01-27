import { useSelector } from 'react-redux';
import {
	selectCartTotalAmount,
	selectStatuses,
	selectUserAmount,
	selectUserId,
} from '../selectors';
import { getAppropriateStatusId } from '../utils';

export const useUserDataToOrder = () => {
	const userId = useSelector(selectUserId);
	const userAmount = useSelector(selectUserAmount);
	const cartAmount = useSelector(selectCartTotalAmount);
	const statuses = useSelector(selectStatuses);

	const newUserAmount = +userAmount + +cartAmount;
	const newUserStatusId = getAppropriateStatusId(statuses, newUserAmount);

	return { userId, newUserAmount, newUserStatusId };
	
};
