const mapPartForApp = require("./mapPartForApp");
const getDiscountedPrice = require("./getDiscountedPrice");

module.exports = (cartData) => {
	const selectedParts = cartData.selectedParts.map(({ part, added }) => {
		const mappedPart = mapPartForApp(part);
		mappedPart.quantity = added;

		const totalPriceOfPart = part.price * added;

		const totalPriceOfPartWithDiscount = getDiscountedPrice(
			totalPriceOfPart,
			cartData.discount
		);

		mappedPart.price = totalPriceOfPartWithDiscount;

		return mappedPart;
	});

	const totalNumber = cartData.total;

	const totalAmount = selectedParts.reduce(
		(total, { price }) => total + +price,
		0
	);

	return { selectedParts, totalNumber, totalAmount };
};
