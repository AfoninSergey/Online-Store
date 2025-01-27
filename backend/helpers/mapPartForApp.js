module.exports = function (dbPart) {
	return {
		id: dbPart.id,
		imageUrl: dbPart.image,
		article: dbPart.article,
		name: dbPart.name,
		price: dbPart.price,
		quantity: dbPart.quantity,
		combineId: dbPart.combine
	};
};