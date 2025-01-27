export const filterPartsByCombine = (parts, id) =>
	parts.filter(({ combineId }) => combineId === id);
