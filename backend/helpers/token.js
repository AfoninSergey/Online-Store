const JWT = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
	generate(data) {
		return JWT.sign(data, JWT_SECRET, { expiresIn: "30d" });
	},
	verify(token) {
		return JWT.verify(token, JWT_SECRET);
	},
};
