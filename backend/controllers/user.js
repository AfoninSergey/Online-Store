const bcrypt = require("bcrypt");
const User = require("../models/User");
const mapUser = require("../helpers/mapUser");
const mapUsers = require("../helpers/mapUsers");
const mapCartDataForApp = require("../helpers/mapCartDataForApp");
const { generate } = require("../helpers/token");
const STATUS = require("../constants/status");
const Cart = require("../models/Cart");

function getStatuses() {
	return [
		{
			id: STATUS.RETAIL,
			name: "Розница",
			discount: 0,
			limit: "30000",
		},
		{
			id: STATUS.SMALL_WHOLESALE,
			name: "Мелкий опт",
			discount: 5,
			limit: "150000",
		},
		{
			id: STATUS.REGULAR_WHOLESALE,
			name: "Опт",
			discount: 10,
			limit: "500000",
		},
		{
			id: STATUS.LARGE_WHOLESALE,
			name: "Крупный опт",
			discount: 15,
		},
	];
}

async function register(regLogin, regPassword) {
	if (!regPassword.trim()) {
		throw new Error("Ошибка! Заполните пароль!");
	}

	const passwordHash = await bcrypt.hash(regPassword, 10);

	const createdUser = await User.create({
		login: regLogin,
		password: passwordHash,
	});

	const token = generate({ id: createdUser.id });

	const statuses = getStatuses();

	return {
		loadedUser: mapUser(statuses, createdUser),
		loadedStatuses: statuses,
		token,
	};
}

async function login(authLogin, authPassword) {
	const user = await User.findOne({ login: authLogin });

	if (!user) {
		throw new Error("Ошибка! Такой пользователь не найден!");
	}

	const isPasswordMatch = await bcrypt.compare(authPassword, user.password);

	if (!isPasswordMatch) {
		throw new Error("Ошибка! Неверный пароль!");
	}

	const cartFromServer = await Cart.findOne({ user: user.id })?.populate({
		path: "selectedParts",
		populate: "part",
	})

	const token = generate({ id: user.id });

	const statuses = getStatuses();
	return {
		loadedUser: mapUser(statuses, user),
		loadedStatuses: statuses,
		cart: cartFromServer ? mapCartDataForApp(cartFromServer) : null,
		token,
	};
}

async function getUsers() {
	const loadedUsers = await User.find();

	return mapUsers(loadedUsers);
}

async function updateUser(userId, userData) {

	const updatedUser = await User.findByIdAndUpdate(userId, userData, {
		returnDocument: "after",
	});
	return mapUsers([updatedUser]);
}

function deleteUser(userId) {
	return User.deleteOne({ _id: userId });
}

module.exports = {
	register,
	login,
	getUsers,
	deleteUser,
	updateUser,
	getStatuses
};
