import mongoose, { Schema } from 'mongoose';

import { SchemaUtils } from '../libs/utils';

const { date, required } = SchemaUtils;

export const schema = new Schema({
	name: required({
		type: String
	}),
	image: String,
	shoes: [{
		ref: 'Shoe',
		type: Schema.Types.ObjectId
	}],
	createdAt: date(),
	updatedAt: date()
})

export default mongoose.model('Brand', schema)