import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { placeOrderAsync, setIsLoading, setSuccessInfo } from '../../actions';
import { Button, Cart, Form, InfoBlock, Input } from '../../components';
import {
	selectCartParts,
	selectServerError,
	selectSuccessInfo,
} from '../../selectors';
import { DELIVERY_OPTIONS, PAYMENT_OPTIONS } from '../../constants';
import { useOrderData, useUserDataToOrder } from '../../hooks';
import styles from './order.module.css';

export const Order = () => {
	const [deliveryChecked, setDeliveryChecked] = useState(DELIVERY_OPTIONS.PICKUP);
	const [paymentChecked, setPaymentChecked] = useState(PAYMENT_OPTIONS.CASH);
	const [deliveryAddress, setDeliveryAddress] = useState('');
	const [validationError, setValidationError] = useState(null);

	const serverError = useSelector(selectServerError);
	const successInfo = useSelector(selectSuccessInfo);
	const cartParts = useSelector(selectCartParts);

	const orderData = useOrderData(deliveryChecked, deliveryAddress, paymentChecked);
	const userData = useUserDataToOrder();

	const dispatch = useDispatch();

	const onSubmit = (event) => {
		event.preventDefault();

		if (
			deliveryChecked !== DELIVERY_OPTIONS.PICKUP &&
			deliveryAddress.trim().length === 0
		) {
			setValidationError('Вы не заполнили адрес доставки...');
			return;
		}
		dispatch(setIsLoading(true));

		dispatch(placeOrderAsync(userData, orderData)).then(
			({ successfully }) => {
				if (successfully) {
					dispatch(
						setSuccessInfo(
							'Ваша заявка успешно оформлена. Дождитесь звонка оператора!',
						),
					);
					setDeliveryChecked(DELIVERY_OPTIONS.PICKUP);
					setPaymentChecked(PAYMENT_OPTIONS.CASH);
					setDeliveryAddress('');
					setTimeout(() => dispatch(setSuccessInfo(null)), 10000)
				}
				dispatch(setIsLoading(false));
			},
		);
	};

	const orderInfo = validationError || serverError || successInfo;
	return (
		<div className={styles.order}>
			<Cart />

			{cartParts.length === 0 && !successInfo ? (
				<>
					<InfoBlock>Ваша корзина пуста...</InfoBlock>
					<Link to="/">
						<Button>На главную</Button>
					</Link>
				</>
			) : (
				<Form
					className={styles.deliveryAndPayment}
					title="Выберите способ доставки и оплаты:"
					errorMessage={orderInfo}
					onSubmit={onSubmit}
				>
					<div className={styles.delivery}>
						<div className={styles.deliveryAndPaymentOptions}>
							{Object.values(DELIVERY_OPTIONS).map((option) => (
								<div
									className={styles.deliveryAndPaymentOption}
									key={option}
								>
									<Input
										label={option}
										type="radio"
										checked={deliveryChecked === option}
										onChange={() => {
											setValidationError(null);
											setDeliveryChecked(option);
										}}
									/>
								</div>
							))}
						</div>
						<div className={styles.deliveryAddress}>
							{deliveryChecked !== DELIVERY_OPTIONS.PICKUP ? (
								<textarea
									value={deliveryAddress}
									onChange={({ target: { value } }) => {
										setValidationError(null);
										setDeliveryAddress(value);
									}}
									placeholder="Заполните Адрес доставки..."
								/>
							) : (
								<div className={styles.contacts}>
									<h3>Ждем Вас по адресу:</h3>
									<div>
										г. Москва, 3-я улица Строителей, дом № 25,
										квартира № 12
									</div>
									<div>
										<b>Телефон:</b>{' '}
										<a href="tel:+77777777777">
											+7(777)777-77-77
										</a>
									</div>
									<div>
										<b>Эл.адрес:</b>{' '}
										<a href="mailto:batman@bruce.wayne">
											<b>batman@bruce.wayne</b>
										</a>
									</div>
								</div>
							)}
						</div>
						<div className={styles.deliveryAndPaymentOptions}>
							{Object.values(PAYMENT_OPTIONS).map((option) => (
								<div
									className={styles.deliveryAndPaymentOption}
									key={option}
								>
									<Input
										label={option}
										type="radio"
										checked={paymentChecked === option}
										onChange={() => setPaymentChecked(option)}
									/>
								</div>
							))}
						</div>
					</div>
					<Button
						addClass="greenButton"
						disabled={validationError || successInfo}
						type="submit"
					>
						Отправить!
					</Button>
				</Form>
			)}
		</div>
	);
};
