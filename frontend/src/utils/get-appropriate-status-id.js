export const getAppropriateStatusId = (statuses, currentAmount) => 
	statuses.find((status) => +currentAmount < +status.limit)?.id ??
	statuses[statuses.length - 1]?.id;
