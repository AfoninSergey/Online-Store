const  getZeros = require('./getZeros')
module.exports = (price, discount) =>
	!discount ? price : getZeros((price - price * (discount / 100)).toFixed(2));
