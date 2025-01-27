import { getZeros } from './get-zeros';

export const getDiscountedPrice = (price, discount) =>
	!discount ? price : getZeros((price - price * (discount / 100)).toFixed(2));
