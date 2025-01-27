const ROLE = require("../constants/role");
const calculateUserStatus = require("./calculateUserStatus");

module.exports = (statuses, dbUser) => {
	const calculatedUserStatus = calculateUserStatus(
		statuses,
		dbUser.status,
		dbUser.amount
	);

	return dbUser.role === ROLE.ADMIN
		? {
				id: dbUser.id,
				login: dbUser.login,
				roleId: dbUser.role,
		  }
		: {
				id: dbUser.id,
				login: dbUser.login,
				roleId: dbUser.role,
				statusId: dbUser.status,
				amount: dbUser.amount,
				status: calculatedUserStatus,
		  };
};
