const Cart = require("../models/Cart");
const mapCartDataForDB = require("../helpers/mapCartDataForDB");
const mapCartDataForApp = require("../helpers/mapCartDataForApp")

async function addCartData(cartData) {
	const cartDataForDB = mapCartDataForDB(cartData);

	const addedCartData = await Cart.create(cartDataForDB);

	await addedCartData.populate({
		path: "selectedParts",
		populate: "part",
	});

	return mapCartDataForApp(addedCartData);
}

async function updateCartData(userId, cartData) {
	const cartDataForDB = mapCartDataForDB(cartData);

	const updatedCartData = await Cart.findOneAndUpdate({user: userId}, cartDataForDB, {
		returnDocument: "after",
	});

	await updatedCartData.populate({
		path: "selectedParts",
		populate: "part",
	});

	return mapCartDataForApp(updatedCartData);
}

function deleteCartData(userId) {
	return Cart.deleteOne({user: userId});

}


//delete

module.exports = {
	addCartData,
	updateCartData,
	deleteCartData
};
