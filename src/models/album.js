import { Schema, model } from "mongoose";
import { SINGLE } from "@/constants/albumTypes";

/**
 * Album model
 */
const albumSchema = Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: null },
    type: { type: Number, default: SINGLE },
    artist: { type: Schema.Types.ObjectId, ref: "User", required: true },
    cover: { type: String, required: false },
    tracks: [{ type: Schema.Types.ObjectId, ref: "Track" }],
    published: { type: Boolean, default: true },
    publishedAt: { type: Date, default: null }
  },
  { timestamps: true }
);

export default model("Album", albumSchema);
