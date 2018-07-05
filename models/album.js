import mongoose, { Schema } from 'mongoose';

/**
 * Album model
 */
const albumSchema = new Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: { type: String, required: true },
	type: { type: String, required: true },
	artist: { type: String, required: true },
	photo: {
		type: String,
		required: true,
		default: ''
	},
	tracks: {
		type: Array,
		required: true,
		default: []
	}
});

export default mongoose.model('Album', albumSchema);
