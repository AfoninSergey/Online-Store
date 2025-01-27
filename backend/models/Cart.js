const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
	selectedParts: [
		{
			part: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Part",
			},
			added: { type: Number, required: true },
		},
	],
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	total: { type: Number, required: true },
	discount: { type: Number, required: true },
});

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;
