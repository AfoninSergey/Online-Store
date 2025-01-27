const mongoose = require("mongoose");

const PartSchema = mongoose.Schema({
	image: String,
	article: { type: String, required: true },
	name: { type: String, required: true, uppercase: true },
	price: { type: String, required: true },
	combine: { type: String, required: true },
	quantity: { type: Number, required: true, min: 1 },
});

const Part = mongoose.model("Part", PartSchema);

module.exports = Part;
