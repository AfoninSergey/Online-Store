const express = require("express");
const { register, login } = require("../controllers/user");

const router = express.Router({ mergeParams: true });

router.post("/register", async ({ body }, res) => {
	try {
		const { loadedUser, loadedStatuses, token } = await register(
			body.login.trim(),
			body.password
		);

		res.cookie("token", token, { httpOnly: true }).send({
			error: null,
			response: { loadedUser, loadedStatuses },
		});
	} catch (error) {
		if (error.code === 11000) {
			res.send({
				error: "Пользователь с таким логином уже зарегестрирован!",
				response: null,
			});
		} else {
			res.send({
				error: "Неизвестная ошибка! Попробуйте перезагрузить страницу...",
				response: null,
			});
		}
	}
});

router.post("/login", async ({ body }, res) => {
	try {
		const { loadedUser, loadedStatuses, cart, token } = await login(
			body.login,
			body.password
		);
		
		res.cookie("token", token, { httpOnly: true }).send({
			error: null,
			response: { loadedUser, loadedStatuses, cart },
		});
	} catch (error) {
		res.send({
			error: "Неизвестная ошибка! Попробуйте перезагрузить страницу...",
			response: null,
		});
	}
});

router.post("/logout", (req, res) => {
	res.cookie("token", "", { httpOnly: true }).send({});
});

module.exports = router;
