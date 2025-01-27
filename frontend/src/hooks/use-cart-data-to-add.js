import { useSelector } from 'react-redux';
import {
	selectCartDataOnServer,
	selectCartParts,
	selectCartTotalNumber,
	selectPart,
	selectUserId,
	selectUserStatus,
} from '../selectors';


export const useCartDataToAdd = (partId, quantityValue) => {
	const { id } = useSelector(selectPart(partId)) || {id: ''};
	const userId = useSelector(selectUserId);
	const userStatus = useSelector(selectUserStatus);
	const cartDataOnServer = useSelector(selectCartDataOnServer);
	let cartTotalNumber = useSelector(selectCartTotalNumber);
	let cartParts = useSelector(selectCartParts);

	const selectedParts = cartParts.some((partInCart) => partInCart.id === id)
		? cartParts.map((cartPart) =>
				cartPart.id === id
					? {
							id: cartPart.id,
							quantity: +cartPart.quantity + +quantityValue,
						}
					: {
							id: cartPart.id,
							quantity: cartPart.quantity,
						},
			)
		: [
				...cartParts.map(({ id, quantity }) => ({
					id,
					quantity,
				})),
				{
					id,
					quantity: +quantityValue,
				},
			];

	return {
		id: userId,
		selectedParts,
		totalNumber: +cartTotalNumber + +quantityValue,
		cartDataOnServer,
		discount: userStatus?.discount || 0,
	};
};

/*
import { useSelector } from 'react-redux';
import {
	selectCartDataOnServer,
	selectCartParts,
	selectCartTotalAmount,
	selectCartTotalNumber,
	selectPart,
	selectUserId,
	selectUserStatus,
} from '../selectors';
import { PART_PLUG } from '../constants';
import { getDiscountedPrice, getZeros } from '../utils';

export const useCartDataToAdd = (partId, quantityValue) => {
	const { id, imageUrl, article, name, combineId, price } =
		useSelector(selectPart(partId)) || PART_PLUG;
	const userId = useSelector(selectUserId);
	const userStatus = useSelector(selectUserStatus);
	const cartDataOnServer = useSelector(selectCartDataOnServer);
	let cartTotalNumber = useSelector(selectCartTotalNumber);
	let cartTotalAmount = useSelector(selectCartTotalAmount);
	let cartParts = useSelector(selectCartParts);

	const totalAmount =
		+getDiscountedPrice(price, userStatus?.discount) * quantityValue;

	const selectedParts = cartParts.some((partInCart) => partInCart.id === id)
		? cartParts.map((cartPart) =>
				cartPart.id === id
					? {
							...cartPart,
							quantity: +cartPart.quantity + +quantityValue,
							price: getZeros(+cartPart.price + totalAmount),
						}
					: cartPart,
			)
		: [
				...cartParts,
				{
					id,
					imageUrl,
					article,
					name,
					combineId,
					quantity: +quantityValue,
					price: getZeros(totalAmount),
				},
			];

	return {
		id: userId,
		selectedParts,
		totalNumber: +cartTotalNumber + +quantityValue,
		totalAmount: getZeros(+cartTotalAmount + +totalAmount),
		cartDataOnServer,
	};
};


*/
