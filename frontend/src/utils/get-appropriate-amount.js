export const getAppropriateAmount = (statuses, statusId) =>
	statusId === 0 ? 0 : statuses[statusId - 1].limit;
