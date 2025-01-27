module.exports = (cartData) => ({
	selectedParts: cartData.selectedParts.map((part) => ({
		part: part.id,
		added: part.quantity,
	})),
	user: cartData.id,
	total: cartData.totalNumber,
	discount: cartData.discount
});
