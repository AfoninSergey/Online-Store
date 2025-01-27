const getZeros = require("./getZeros");
const ROLE = require("../constants/role");

module.exports = (dbUsers) =>
	dbUsers
		.filter(({ role }) => role !== ROLE.ADMIN)
		.map((dbUser) => ({
			id: dbUser.id,
			login: dbUser.login,
			statusId: dbUser.status,
			amount: getZeros(dbUser.amount),
		}));
