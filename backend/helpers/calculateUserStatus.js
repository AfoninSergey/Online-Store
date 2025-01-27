const STATUS = require("../constants/status");
// const STATUSES = require("../constants/statuses");

const getZeros = require("./getZeros");

module.exports = (statuses, userStatusId = 0, userAmount) => {
	const { discount, limit } = statuses.find(
		(status) => status.id === userStatusId
	);

	return userStatusId !== STATUS.LARGE_WHOLESALE
		? {
				discount,
				remainAmount: getZeros(limit - userAmount),
				nextDiscount: discount + 5,
		  }
		: { discount };
};
