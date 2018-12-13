import Track from "@/models/track";

/**
 * @description Get all tracks
 * @param {*} req
 * @param {*} res
 */
export default async (req, res) => {
  try {
    const tracks = await Track.find().populate("artist");

    res.status(200).json({
      count: tracks.length,
      tracks
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};
