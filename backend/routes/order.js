const express = require("express");
const authenticated = require("../middlewares/authenticated");
const addOrder = require("../controllers/order");
const router = express.Router({ mergeParams: true });

router.post("/", authenticated, async ({ body }, res) => {
	try {
		const response = await addOrder(body.userData, body.orderData);

		res.send({
			error: null,
			response,
		});
	} catch (error) {
		res.send({
			error: "Неизвестная ошибка! Попробуйте перезагрузить страницу...",
			response: null,
		});
	}
});

module.exports = router;
