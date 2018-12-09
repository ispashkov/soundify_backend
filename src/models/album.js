import { Schema, model } from "mongoose";

/**
 * Album model
 */
const albumSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  artist: { type: String, required: true },
  photo: {
    type: String,
    required: true,
    default: ""
  },
  tracks: {
    type: Array,
    required: true,
    default: []
  }
});

export default model("Album", albumSchema);
