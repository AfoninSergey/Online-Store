const getZeros = require("./getZeros");

module.exports = (partData) => ({
	name: partData.name,
	price: getZeros(partData.price),
	article: partData.article,
	quantity: partData.quantity,
	image: partData.imageUrl,
	combine: partData.combineId,
});
