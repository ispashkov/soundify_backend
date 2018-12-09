import { Schema, model } from "mongoose";

/**
 * Track model
 */
const trackSchema = Schema({
  name: { type: String, required: true },
  artist_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  cover: { type: String, required: true },
  explicit: { type: Boolean, default: false },
  isFeature: { type: Boolean, default: false },
  featureArtists: { type: Array }
});

export default model("Track", trackSchema);
