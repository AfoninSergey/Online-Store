const User = require("../models/User");
const { verify } = require("../helpers/token");

module.exports = async (req, res, next) => {
	if (!req.cookies.token) {
		res.send({
			error: "Для совершения данного действия, войдите в свой аккаунт!",
			response: null,
		});
		return;
	}

	const { id } = verify(req.cookies.token);

	const user = await User.findOne({ _id: id });

	if (!user) {
		res.send({
			error: "Ошибка! Пользователь не найден!",
			response: null,
		});
		return;
	}

	req.user = user;

	next();
};
