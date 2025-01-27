import { useSelector } from 'react-redux';
import { Cart, InfoBlock, Modal, PartItem } from '../../components';
import styles from './cart-page.module.css';
import { selectCartParts, selectCombines } from '../../selectors';

export const CartPage = () => {
	const cartParts = useSelector(selectCartParts);
	const combines = useSelector(selectCombines);
	return (

		<div className={styles.cartPage}>
			<Modal>эту запчасть из корзины</Modal>
			{cartParts.length === 0 ? (
				<InfoBlock>Ваша корзина пуста...</InfoBlock>
			) : (
				<ul className={styles.partsList}>
					
					{cartParts.map(({ id, ...props }) => (
						<PartItem
							key={id}
							id={id}
							combines={combines}
							isCart
							{...props}
						/>
					))}
				</ul>
			)}

			<Cart />
		</div>
	);
};
