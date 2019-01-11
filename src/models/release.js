import { Schema, model } from "mongoose";

const release = Schema(
  {
    type: { type: Number, required: true },
    releaseDate: { type: Date, required: true },
    released: { type: Boolean, default: false },
    tracks: [{ type: Schema.Types.ObjectId, ref: "Track" }],
    cover: { type: String, required: false },
    featureArtists: [{ type: Schema.Types.ObjectId, ref: "User" }]
  },
  { timestamps: true }
);

export default model("Release", release);
