const express = require("express");

const {
	addPart,
	editPart,
	editParts,
	deletePart,
	getParts,
	getCombines,
} = require("../controllers/part");
const authenticated = require("../middlewares/authenticated");
const hasRole = require("../middlewares/hasRole");
const ROLE = require("../constants/role");

const router = express.Router({ mergeParams: true });

router.get("/combines", (req, res) => {
	const combines = getCombines();
	res.send({
		error: null,
		response: combines,
	});
});

router.get("/", async (req, res) => {
	try {
		const parts = await getParts();

		res.send({
			error: null,
			response: parts,
		});
	} catch (error) {
		res.send({
			error: "Неизвестная ошибка! Попробуйте перезагрузить страницу...",
			response: null,
		});
	}
});

router.post(
	"/add",
	authenticated,
	hasRole([ROLE.ADMIN]),
	async ({ body }, res) => {
		try {
			const addedPart = await addPart(body);
			res.send({
				error: null,
				response: addedPart,
			});
		} catch (error) {
			res.send({
				error: "Неизвестная ошибка! Попробуйте перезагрузить страницу...",
				response: null,
			});
		}
	}
);
router.patch(
	"/edit/:id",
	authenticated,
	hasRole([ROLE.ADMIN]),
	async ({ params, body }, res) => {
		try {
			const updatedPart = await editPart(params.id, body);

			res.send({
				error: null,
				response: updatedPart,
			});
		} catch (error) {
			res.send({
				error: "Неизвестная ошибка! Попробуйте перезагрузить страницу...",
				response: null,
			});
		}
	}
);

router.patch(
	"/edit",
	authenticated,
	hasRole([ROLE.ADMIN]),
	async ({ body }, res) => {
		try {
			const updatedParts = await editParts(body);

			res.send({
				error: null,
				response: updatedParts,
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
			const { deletedCount } = await deletePart(params.id);

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
