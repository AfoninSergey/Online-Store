export const getCurrentQuantity = (initialQuantity, parts, partId) => {
	const partInCart = parts.find((part) => part.id === partId);

	return partInCart ? initialQuantity - partInCart.quantity : initialQuantity;
};
