import { useSelector } from 'react-redux';
import { selectCartData } from '../selectors';

export const useOrderData = (delivery, adress, payment) => {
	const cartData = useSelector(selectCartData);
	
	delete cartData.cartDataOnServer;


	const orderData = { ...cartData, delivery, payment };

	if (adress) orderData.adress = adress;

	return orderData;
};
