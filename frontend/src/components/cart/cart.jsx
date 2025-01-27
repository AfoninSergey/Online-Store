import { useSelector } from 'react-redux';
import { Link, useMatch } from 'react-router-dom';
import { selectCartTotalAmount, selectCartTotalNumber } from '../../selectors';
import styles from './cart.module.css';
import { Button } from '../button/button';

export const Cart = () => {
	const cartTotalNumber = useSelector(selectCartTotalNumber);
	const cartTotalAmount = useSelector(selectCartTotalAmount);

	const isCart = !!useMatch('/cart');

	return (
		<Link to={!isCart ? '/cart' : ''} title={!isCart ? 'Перейти в корзину' : ''}>
			<div className={`${styles.cart} ${!isCart ? styles.active : ''}`}>
				<img
					src={`../pictures/icons/cart${cartTotalNumber !== 0 ? '+' : ''}.png`}
					alt="Корзина"
					width={141}
					height={141}
				/>

				<div className={styles.content}>
					<div className={styles.totalNumber}>
						Итого: <b>{cartTotalNumber}</b> шт.
					</div>

					<div className={styles.totalAmount}>
						Общая сумма: <b>{cartTotalAmount}</b> р. с НДС
					</div>
				</div>

				{isCart && <Link to="/order"><Button  disabled={cartTotalNumber === 0}>Оформить</Button></Link>}
			</div>
		</Link>
	);
};
