export const getZeros = (data) => {
	const str = String(data);
	if (str.indexOf('.') === -1) {
		return `${str}.00`;
	} else if (str.length - str.indexOf('.') - 1 === 0) {
		return `${str}00`;
	} else if (str.length - str.indexOf('.') - 1 === 1) {
		return `${str}0`;
	} else {
		return str;
	}
};
