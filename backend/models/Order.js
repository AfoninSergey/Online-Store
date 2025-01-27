const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
	{
		selectedParts: [
			{
				id: { type: String, required: true },
				imageUrl: String,
				article: { type: String, required: true },
				name: { type: String, required: true },
				combineId: { type: String, required: true },
				quantity: { type: Number, required: true },
				price: { type: String, required: true },
			},
		],
		userId: { type: String, required: true },
		totalNumber: { type: Number, required: true },
		totalAmount: { type: String, required: true },
		delivery: { type: String, required: true },
		payment: { type: String, required: true },
	},
	{ timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
