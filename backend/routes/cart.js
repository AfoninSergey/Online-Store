const express = require("express");
const { addCartData, updateCartData, deleteCartData } = require("../controllers/cart");
const authenticated = require("../middlewares/authenticated");
const router = express.Router({ mergeParams: true });

router.post("/", authenticated, async ({ body }, res) => {
	try {
		const addedCartData = await addCartData(body);

		res.send({
			error: null,
			response: addedCartData,
		});
	} catch (error) {
		if (error.message.includes("user")) {
			res.send({
				error: "Ошибка! Вы не авторизованы! Для добавления товаров в корзину и для удаления товаров из корзины, войдите в свою учетную запись!",
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

router.put("/:id", authenticated, async ({ params, body }, res) => {
	try {
		const updatedCartData = await updateCartData(params.id, body);
		res.send({
			error: null,
			response: updatedCartData,
		});
	} catch (error) {
		if (error.message.includes("user")) {
			res.send({
				error: "Ошибка! Вы не авторизованы! Для добавления товаров в корзину и для удаления товаров из корзины, войдите в свою учетную запись!",
				response: null,
			});
		} else {
			res.send({
				error: "Неизвестная ошибка! Попробуйте перезагрузить страницу...",
				// error: error.message,
				response: null,
			});
		}
	}
});

router.delete("/:id", authenticated, async ({ params}, res) => {
	try {
		const { deletedCount } = await deleteCartData(params.id);

		res.send({
			error: null,
			response: !!deletedCount,
		});
	} catch (error) {
		if (error.message.includes("user")) {
			res.send({
				error: "Ошибка! Вы не авторизованы! Для добавления товаров в корзину и для удаления товаров из корзины, войдите в свою учетную запись!",
				response: null,
			});
		} else {
			res.send({
				// error: "Неизвестная ошибка! Попробуйте перезагрузить страницу...",
				error: error.message,
				response: null,
			});
		}
	}
});

module.exports = router;
