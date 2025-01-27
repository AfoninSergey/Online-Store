import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useCartDataToAdd } from '../../hooks';
import { Button, Cart, ErrorLabel, Input, PartPrice } from '../../components';
import {
	getCombineName,
	getCurrentQuantity,
	getZeros,
	setNoScroll,
} from '../../utils';
import { selectCartParts, selectCombines, selectIsLoading, selectPart } from '../../selectors';
import { PART_PLUG } from '../../constants';
import styles from './part.module.css';
import { setIsLoading, updateCartAsync } from '../../actions';
import { ErrorPage } from '../error-page/error-page';

export const Part = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const combines = useSelector(selectCombines);
	const { imageUrl, article, name, combineId, price, quantity } =
		useSelector(selectPart(id)) || PART_PLUG;
	const cartParts = useSelector(selectCartParts);
	const isLoading = useSelector(selectIsLoading)

	const currentQuantity = getCurrentQuantity(quantity, cartParts, id);

	const [errorMessage, setErrorMesage] = useState(null);
	const [openImage, setOpenImage] = useState(false);
	const [quantityValue, setQuantityValue] = useState('1');

	const cartData = useCartDataToAdd(id, quantityValue);

	const onOpenImage = () => {
		setOpenImage(!openImage);
		setNoScroll(!openImage);
	};

	const onQuantityValueChange = ({ target: { value } }) => {
		value = value.replace(/[^0-9]/g, '');

		if (value.indexOf('0') === 0) {
			value = quantityValue;
		}

		if (+value > currentQuantity) {
			value = `${currentQuantity}`;
		}

		setQuantityValue(value);
	};

	const onQuantityValueBlur = ({ target: { value } }) => {
		if (value === '') {
			setQuantityValue('1');
		}
	};

	const onIncrQuantity = () => {
		if (+quantityValue < currentQuantity) {
			setQuantityValue(+quantityValue + 1);
		}
	};
	const onDecrQuantity = () => {
		if (+quantityValue > 1) {
			setQuantityValue(quantityValue - 1);
		}
	};

	const onAddToCart = () => {
		dispatch(setIsLoading(true));
		dispatch(updateCartAsync(cartData)).then(({error, response}) => {
			setErrorMesage(error);
			
			if (!error) {
				sessionStorage.setItem(
					'currentUserCartData',
					JSON.stringify(response),
				);
				setQuantityValue('1');
			}
			dispatch(setIsLoading(false));
		});
	};


	if (!isLoading && article === '00.00.00.000') {
		return <ErrorPage>Нет такой запчасти...</ErrorPage>
	}

	const combineName =
		combines.length !== 0 ? getCombineName(combines, combineId) : '';

	return (
		<div className={styles.part}>
			<Cart />

			<div className={styles.partBlock}>
				{errorMessage && <ErrorLabel>{errorMessage}</ErrorLabel>}
				<div className={styles.leftSide}>
					<div
						className={`${styles.partImage} ${openImage ? styles.active : ''}`}
					>
						{imageUrl && (
							<img
								src={imageUrl}
								alt={article}
								onClick={onOpenImage}
							/>
						)}
					</div>
					<div className={styles.partArticle}>
						<b>Артикул: </b> {article}
					</div>
				</div>
				<div className={styles.rigtSide}>
					<div className={styles.partTitle}>
						<span className={styles.partName}>{name}</span>
						<b> "{combineName}"</b>
					</div>

					{currentQuantity === 0 ? (
						<div className={styles.partMaximum}>
							Вы добавили в корзину максимум из наличия!
						</div>
					) : (
						<div className={styles.partQuantity}>
							<Input
								className={styles.quantityBig}
								label={`В наличии: ${currentQuantity}`}
								value={quantityValue}
								onChange={onQuantityValueChange}
								onBlur={onQuantityValueBlur}
							/>
							<button
								className={styles.arrowUp}
								onClick={onIncrQuantity}
							>
								▲
							</button>
							<button
								className={styles.arrowDown}
								onClick={onDecrQuantity}
							>
								▼
							</button>
							<div>Количество</div>
						</div>
					)}

					<PartPrice
						addClass="totalAmount"
						price={getZeros(+price * quantityValue)}
						title="Стоимость:"
					/>
					<div className={styles.partButtons}>
						<Button onClick={() => navigate(-1)}>НАЗАД</Button>
						<Button
							disabled={errorMessage || currentQuantity === 0}
							onClick={onAddToCart}
						>
							Добавить в корзину
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};
