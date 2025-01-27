const Part = require("../models/Part");
const mapPartForApp = require("../helpers/mapPartForApp");
const mapPartForDB = require("../helpers/mapPartForDB");
const sortByAlphabet = require("../helpers/sortByAlphabet");
const COMBINE = require("../constants/combine");

function getCombines() {
	return [
		{
			id: COMBINE.VECTOR,
			name: "Вектор",
		},
		{
			id: COMBINE.DON_1500B,
			name: "ДОН-1500Б",
		},
		{
			id: COMBINE.DON_680M,
			name: "ДОН-680М",
		},
		{
			id: COMBINE.AKROS,
			name: "Акрос",
		},
		{
			id: COMBINE.DON_1500A,
			name: "ДОН-1500А",
		},
		{
			id: COMBINE.NIVA,
			name: "Нива",
		},
		{
			id: COMBINE.TORUM,
			name: "Торум",
		},
		{
			id: COMBINE.PALESSE,
			name: "Полесье",
		},
		{
			id: COMBINE.YENISEI,
			name: "Енисей",
		},
	];
}

async function addPart(newPart) {
	const addedPart = await Part.create(mapPartForDB(newPart));

	return mapPartForApp(addedPart);
}

async function editPart(partId, updatedPartData) {
	const updatedPart = await Part.findByIdAndUpdate(
		partId,
		mapPartForDB(updatedPartData),
		{
			returnDocument: "after",
		}
	);

	return mapPartForApp(updatedPart);
}

async function editParts(arrayOfChangedParts) {
	const updatedParts = await Promise.all(
		arrayOfChangedParts.map((changedPart) =>
			Part.findByIdAndUpdate(changedPart.id, mapPartForDB(changedPart), {
				returnDocument: "after",
			})
		)
	);

	return updatedParts.map(mapPartForApp);
}

function deletePart(partId) {
	return Part.deleteOne({ _id: partId });
}

async function getParts() {
	const loadedParts = await Part.find();

	const sortedParts = sortByAlphabet(loadedParts, "name");

	return sortedParts.map(mapPartForApp);
}

module.exports = {
	addPart,
	editPart,
	editParts,
	deletePart,
	getParts,
	getCombines,
};
