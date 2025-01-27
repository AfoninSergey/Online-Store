const express = require("express");
const { getUsers, updateUser, deleteUser } = require("../controllers/user");
const ROLE = require("../constants/role");
const authenticated = require("../middlewares/authenticated");
const hasRole = require("../middlewares/hasRole");

const router = express.Router({ mergeParams: true });

router.get("/", authenticated, hasRole([ROLE.ADMIN]), async (req, res) => {
	try {
		const users = await getUsers();

		res.send({
			error: null,
			response: users,
		});
	} catch (error) {
		res.send({
			error: "Неизвестная ошибка! Попробуйте перезагрузить страницу...",
			response: null,
		});
	}
});
router.patch(
	"/:id",
	authenticated,
	hasRole([ROLE.ADMIN]),
	async ({ params, body }, res) => {
		try {
			const [updatedUser] = await updateUser(params.id, {
				status: body.statusId,
				amount: body.amount,
			});

			res.send({
				error: null,
				response: updatedUser,
			});
		} catch (error) {
			res.send({
				error: "Неизвестная ошибка! Попробуйте перезагрузить страницу...",
				response: null,
			});
		}
	}
);
router.delete(
	"/:id",
	authenticated,
	hasRole([ROLE.ADMIN]),
	async ({ params }, res) => {
		try {
			const { deletedCount } = await deleteUser(params.id);

			res.send({
				error: null,
				response: !!deletedCount,
			});
		} catch (error) {
			res.send({
				error: "Неизвестная ошибка! Попробуйте перезагрузить страницу...",
				response: null,
			});
		}
	}
);

module.exports = router;
