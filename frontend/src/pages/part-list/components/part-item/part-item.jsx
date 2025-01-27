import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Select } from '../../../../components';
import { selectPart, selectUpdatePartsTrigger } from '../../../../selectors';
import { getZeros, setNoScroll } from '../../../../utils';
import {
	openModal,
	removePartAsync,
	resetPartData,
	savePartDataAsync,
	setIdForPartUpdating,
	setIsLoading,
	setServerError,
	updateChangedPart,
} from '../../../../actions';
import styles from './part-item.module.css';

export const PartItem = ({ id, combines, part }) => {
	const [initialPartData, setInitialPartData] = useState(part);
	const loadedPart = useSelector(selectPart(id)) || {};
	const updatePartTrigger = useSelector(selectUpdatePartsTrigger);

	const { article, name, quantity, price, imageUrl, combineId } = loadedPart;

	const dispatch = useDispatch();

	useEffect(() => {
		setInitialPartData(part);
	}, [updatePartTrigger, part]);

	const onPartDataChange = ({ target: { value, name } }) => {
		dispatch(setServerError(null));
		if (name === 'quantity') {
			value =
				value.indexOf('0') === 0 ? quantity : value.replace(/[^0-9]/g, '');
		} else if (name === 'price') {
			value =
				value.indexOf('0') === 0
					? price
					: value.replace(/[^0-9.,]/g, '').replace(',', '.');
		}

		dispatch(updateChangedPart({ id, value, name }));
	};

	const onPartDataBlur = ({ target: { value, name } }) => {
		if (value === '' && name !== 'imageUrl') {
			value = initialPartData[name];
			dispatch(updateChangedPart({ id, value, name }));
		} else if (name === 'price') {
			value = getZeros(value);
			dispatch(updateChangedPart({ id, value, name }));
		}
	};

	const onPartDataReset = () => {
		dispatch(setServerError(null));
		dispatch(resetPartData(initialPartData));
	};

	const onPartDataSave = () => {
		dispatch(setServerError(null));
		dispatch(setIsLoading(true));
		dispatch(savePartDataAsync(id, loadedPart)).then(
			({ error, response }) => {
				if (error === null && response.id !== undefined) {
					setInitialPartData(response);
					dispatch(setIdForPartUpdating(response.id)); 
				}
				dispatch(setIsLoading(false));
			},
		);
	};

	const onPartRemove = () => {
		dispatch(setIsLoading(true));
		dispatch(removePartAsync(id)).then(() =>
			dispatch(setIsLoading(false))
		);
	};

	const onOpenModal = () => {
		dispatch(setServerError(null));
		setNoScroll(true);
		dispatch(
			openModal({
				text: 'эту запчасть',
				onConfirm: onPartRemove,
			}),
		);
	};

	const isCancelButtonDisabled =
		JSON.stringify({
			...initialPartData,
			quantity: +initialPartData.quantity,
		}) ===
		JSON.stringify({
			...loadedPart,
			quantity: +loadedPart.quantity,
			price: getZeros(loadedPart.price),
		});
	const isSaveButtonDisabled = isCancelButtonDisabled || isNaN(price);
	return (
		<div className={styles.partItem}>
			<Input
				className={styles.partArticle}
				name="article"
				value={article}
				placeholder={initialPartData.article}
				onInput={onPartDataChange}
				onBlur={onPartDataBlur}
			/>
			<Input
				className={styles.partName}
				name="name"
				value={name}
				placeholder={initialPartData.name}
				onChange={onPartDataChange}
				onBlur={onPartDataBlur}
			/>
			<div className={styles.quantity}>
				<Input
					name="quantity"
					value={quantity}
					placeholder={initialPartData.quantity}
					onChange={onPartDataChange}
					onBlur={onPartDataBlur}
				/>
				<button
					type="button"
					name="quantity"
					value={+quantity + 1}
					className={styles.arrowUp}
					onClick={onPartDataChange}
				>
					▲
				</button>
				<button
					type="button"
					name="quantity"
					className={styles.arrowDown}
					value={+quantity > 1 ? +quantity - 1 : quantity}
					onClick={onPartDataChange}
				>
					▼
				</button>
			</div>
			<Input
				className={styles.partPrice}
				name="price"
				value={price}
				placeholder={initialPartData.price}
				onChange={onPartDataChange}
				onBlur={onPartDataBlur}
			/>
			<Input
				className={styles.partImageUrl}
				name="imageUrl"
				value={imageUrl}
				placeholder={initialPartData.imageUrl}
				onChange={onPartDataChange}
				onBlur={onPartDataBlur}
			/>
			<Select
				className={styles.partCombine}
				name="combineId"
				value={combineId}
				onChange={onPartDataChange}
				onBlur={onPartDataBlur}
			>
				{combines.map(({ id, name }) => (
					<option key={id} value={id}>
						{name}
					</option>
				))}
			</Select>
			<Button
				addClass="cancelButton"
				disabled={isCancelButtonDisabled}
				title="Отменить изменения"
				onClick={onPartDataReset}
			/>
			<Button
				addClass="saveButton"
				disabled={isSaveButtonDisabled}
				title="Сохранить изменения"
				onClick={onPartDataSave}
			/>
			<Button
				addClass="deleteButton"
				title="Удалить пользователя"
				onClick={onOpenModal}
			/>
		</div>
	);
};
