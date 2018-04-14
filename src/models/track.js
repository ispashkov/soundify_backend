import mongoose, { Schema } from 'mongoose';

const trackSchema = new Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: { type: String, required: true },
	artist: { type: String, required: true },
	photo: { type: String, required: true }
});

export default mongoose.model('Track', trackSchema);
