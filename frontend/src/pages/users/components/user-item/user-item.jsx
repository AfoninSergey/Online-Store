import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Input, Select } from '../../../../components';
import {
	getAppropriateAmount,
	getAppropriateStatusId,
	getZeros,
	setNoScroll,
} from '../../../../utils';
import {
	openModal,
	removeUserAsync,
	saveUserDataAsync,
	setServerError,
	CHANGE_UPDATE_USERS_TRIGGER,
	setIsLoading,
} from '../../../../actions';
import { ERROR_MESSAGE } from '../../../../constants';
import styles from './user-item.module.css';

export const UserItem = ({
	userId,
	num,
	login,
	loadedStatusId,
	loadedAmount,
	statuses,
}) => {
	const [initialStatusId, setInitialStatusId] = useState(loadedStatusId);
	const [initialAmount, setInitialAmount] = useState(loadedAmount);
	const [userStatusId, setUserStatusId] = useState(initialStatusId);
	const [userAmount, setUserAmount] = useState(initialAmount);

	const dispatch = useDispatch();


	const onUserStatusChange = ({ target: { value } }) => {
		setUserStatusId(+value);
		const appropriateAmount = getAppropriateAmount(statuses, +value);
		setUserAmount(getZeros(appropriateAmount));
		dispatch(setServerError(null));
	};

	const onUserAmountChange = ({ target: { value } }) => {
		value = value.replace(/[^0-9.,]/g, '').replace(',', '.');

		setUserAmount(value);

		const appropriateStatusId = getAppropriateStatusId(statuses, value);
		setUserStatusId(appropriateStatusId);
		dispatch(setServerError(null));
	};

	const onCancel = () => {
		setUserStatusId(initialStatusId);
		setUserAmount(initialAmount);
		dispatch(setServerError(null));
	};

	const onUserDataSave = () => {
		dispatch(setServerError(null));
		dispatch(setIsLoading(true));
		dispatch(
			saveUserDataAsync(userId, userStatusId, userAmount),
		).then(({ error, response }) => {
			if (error !== null) {
				dispatch(setServerError(error));
			} else if (
				response.amount === undefined ||
				response.statusId === undefined
			) {
				dispatch(setServerError(ERROR_MESSAGE.SERVER_LONG));
			} else {
				setInitialStatusId(response.statusId);
				setInitialAmount(getZeros(response.amount));
				setUserAmount(getZeros(response.amount));
			}
			dispatch(setIsLoading(false));
		});
	};

	const onUserRemove = () => {
		dispatch(setIsLoading(true));
		dispatch(removeUserAsync(userId)).then(
			({ error, response }) => {
				if (error !== null) {
					dispatch(setServerError(error));
				} else if (!response) {
					dispatch(setServerError(ERROR_MESSAGE.SERVER_LONG));
				} else {
					dispatch(CHANGE_UPDATE_USERS_TRIGGER);
				}
				dispatch(setIsLoading(false));
			},
		);
	};

	const onOpenModal = () => {
		dispatch(setServerError(null));
		setNoScroll(true);
		dispatch(
			openModal({
				text: 'данного клиента',
				onConfirm: onUserRemove,
			}),
		);
	};

	const isCancelButtonDisabled =
		initialStatusId === userStatusId && +initialAmount === +userAmount;
	const isSaveButtonDisabled =
		(initialStatusId === userStatusId && +initialAmount === +userAmount) ||
		userAmount.length === 0 ||
		isNaN(userAmount);

	return (
		<div className={styles.usersItem}>
			<Input value={num} disabled className={styles.usersNum} />
			<Input disabled value={login} className={styles.usersLogin} />
			<Select
				value={userStatusId}
				className={styles.usersStatus}
				onChange={onUserStatusChange}
			>
				{statuses.map(({ id, name }) => (
					<option key={id} value={id}>
						{name}
					</option>
				))}
			</Select>
			<Input
				value={userAmount}
				placeholder={initialAmount}
				className={styles.usersAmount}
				onChange={onUserAmountChange}
			/>
			<Button
				addClass="cancelButton"
				disabled={isCancelButtonDisabled}
				title="Отменить изменения"
				onClick={onCancel}
			/>
			<Button
				addClass="saveButton"
				disabled={isSaveButtonDisabled}
				title="Сохранить изменения"
				onClick={onUserDataSave}
			/>
			<Button
				addClass="deleteButton"
				title="Удалить пользователя"
				onClick={onOpenModal}
			/>
		</div>
	);
};
