import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { PartPrice } from '../part-price/part-price';
import { Button } from '../button/button';
import { useCartDataToDelete } from '../../hooks';
import {
	openModal,
	removeCartDataAsync,
	setIsLoading,
	updateCartAsync,
} from '../../actions';
import { getCombineName, setNoScroll } from '../../utils';
import styles from './part-item.module.css';
import { ErrorLabel } from '../error-label/error-label';

export const PartItem = ({
	id,
	imageUrl,
	article,
	name,
	price,
	combineId,
	combines,
	quantity,
	isCart,
}) => {
	const [errorMessage, setErrorMesage] = useState(null);

	const dispatch = useDispatch();
	const cartData = useCartDataToDelete(id, quantity);

	const onPartFromCartRemove = () => {
		dispatch(setIsLoading(true));

		if (cartData.totalNumber !== 0) {
			dispatch(updateCartAsync(cartData)).then(({ error, response }) => {
				setErrorMesage(error);

				if (!error) {
					sessionStorage.setItem(
						'currentUserCartData',
						JSON.stringify(response),
					);
				}
				dispatch(setIsLoading(false));
			});
		} else {
			dispatch(removeCartDataAsync(cartData.id)).then(
				({ error, response }) => {
					setErrorMesage(error);

					if (!error && response) {
						sessionStorage.removeItem('currentUserCartData');
					}
					dispatch(setIsLoading(false));
				},
			);
		}
	};

	const onOpenModal = () => {
		setNoScroll(true);
		dispatch(
			openModal({
				text: 'эту запчасть из корзины',
				onConfirm: onPartFromCartRemove,
			}),
		);
	};
	return (
		<li className={`${styles.part} ${isCart ? styles.inCart : ''}`}>
			{errorMessage && <ErrorLabel>{errorMessage}</ErrorLabel>}
			<div className={styles.partImage}>
				{imageUrl && <img src={imageUrl} alt={article} />}
			</div>
			<div className={styles.partContent}>
				<div className={styles.partTitle}>
					<span className={styles.partName}>{name}</span>
					<b>"{getCombineName(combines, combineId)}"</b>
				</div>
				<div className={styles.partBottom}>
					<div className={styles.partArticleAndPrice}>
						<div>
							<b>Артикул:</b> {article}
						</div>
						{isCart && quantity && (
							<div className={styles.partQuantity}>
								Количество: <b>{quantity}</b> шт.
							</div>
						)}
						<PartPrice
							isCart={isCart}
							price={price}
							title={isCart ? 'СТОИМОСТЬ:' : 'ЦЕНА:'}
						/>
					</div>

					{isCart ? (
						<Button
							addClass="smallButton"
							onClick={onOpenModal}
							disabled={errorMessage}
						>
							УДАЛИТЬ
						</Button>
					) : (
						<Link to={`/part/${id}`}>
							<Button addClass="smallButton">Перейти</Button>
						</Link>
					)}
				</div>
			</div>
		</li>
	);
};
