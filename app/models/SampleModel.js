import mongoose, { Schema } from 'mongoose';

const { SchemaUtils: { date, required } } = require('../libs/utils');

export const schema = new Schema({
	name: {
		first: required(String),
		last: required(String)
	},
	email: required(String, {
		match: /[a-z0-9\.]+@[a-z0-9\.]+\.[a-z0-9\.]{2,}/
	}),
	createdAt: date(),
	updatedAt: date()
})

export default mongoose.model('Brand', schema)