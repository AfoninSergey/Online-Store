export const getChangedObjects = (
	arrayOfInitialObjects,
	arrayOfObjectsWithChanges,
) => {
	const initialJSONArr = arrayOfInitialObjects.map(JSON.stringify);
	const JSONArrWithChanges = arrayOfObjectsWithChanges.map(JSON.stringify);

	return JSONArrWithChanges.filter(
		(changedJSONObj) => !initialJSONArr.includes(changedJSONObj),
	).map((JSONobj) => JSON.parse(JSONobj));
};
