import { Schema, model } from "mongoose";

/**
 * Track model
 */
const trackSchema = Schema({
  name: { type: String, required: true },
  artist: { type: Schema.Types.ObjectId, ref: "User", required: true },
  album: { type: Schema.Types.ObjectId, ref: "Album" },
  cover: { type: String, required: true },
  explicit: { type: Boolean, default: false },
  isFeature: { type: Boolean, default: false },
  featureArtists: [{ type: Schema.Types.ObjectId, ref: "User" }]
});

export default model("Track", trackSchema);
