const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			min: 3,
			max: 20,
			unique: true,
		},
		email: {
			type: String,
			max: 50,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			min: 6,
			max: 50,
		},
		follow: {
			type: Array,
			default: [],
		},
		follower: {
			type: Array,
			default: [],
		},
		desc: {
			type: String,
			max: 70,
		},
		profilePicture: {
			type: String,
			default: "",
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", UserSchema)