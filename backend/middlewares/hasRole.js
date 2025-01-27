module.exports = (roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			res.send({
				error: "Ошибка! Доступ запрещен!",
				response: null,
			});
		} else {
			next();
		}
	};
};
