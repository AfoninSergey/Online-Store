const mongoose = require("mongoose");
const ROLES = require("../constants/role");
const STATUS = require("../constants/status");

const UserSchema = mongoose.Schema({
	login: {
		type: String,
		required: true,
		unique: true,
		minLength: 2,
		maxLength: 20,
		validate: {
			validator: (value) => /^[\w_ -]*$/.test(value),
			message:
				"Ошибка! Логин может содержать только латинские буквы, цыфры, пробел и знаки: - и _",
		},
	},
	password: {
		type: String,
		required: true,
	},
	role: { type: Number, default: ROLES.CLIENT },
	status: { type: Number, default: STATUS.RETAIL },
	amount: { type: String, default: "0.00" },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
