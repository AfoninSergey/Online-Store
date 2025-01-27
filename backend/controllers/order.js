const mapUser = require("../helpers/mapUser");
const Order = require("../models/Order");
const User = require("../models/User");
const { deleteCartData } = require("./cart");
const { getStatuses } = require("./user");

async function addOrder({ userId, newUserStatusId, newUserAmount }, order) {
	const [addedOrder, { deletedCount }, updatedUser] = await Promise.all([
		Order.create({ ...order, userId }),
		deleteCartData(userId),
		User.findByIdAndUpdate(
			userId,
			{ status: newUserStatusId, amount: newUserAmount },
			{
				returnDocument: "after",
			}
		),
	]);

	const statuses = getStatuses();

	return !!addedOrder && !!deletedCount && mapUser(statuses, updatedUser);
}

module.exports = addOrder;
