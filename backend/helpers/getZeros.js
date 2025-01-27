module.exports = (data) => {
	let str = String(data);

	if (str.indexOf('.') === 0) {
		str = `0${str}`;
	}

	if (str.indexOf('.') !== -1 && str.length - str.indexOf('.') > 3) {
		str = str.slice(0, str.indexOf('.')  + 3)
	}

	if (str.indexOf('.') === -1) {
		return `${str}.00`;
	} else if (str.length - str.indexOf('.') - 1 === 1) {
		return `${str}0`;
	} else {
		return str;
	}
};
