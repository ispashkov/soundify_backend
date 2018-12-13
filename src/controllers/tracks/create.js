import Track from "@/models/track";
import User from "@/models/user";
import { ROLE_ARTIST } from "@/constants/roles";

/**
 * @description Create new track
 * @param {*} req
 * @param {*} res
 */
export default async (req, res) => {
  try {
    const { name, artist } = req.body;

    const user = await User.findById(artist);
    const isArtist = user.role === ROLE_ARTIST;

    if (isArtist) {
      const track = new Track({
        name,
        artist,
        cover: `/${req.file.path}`
      });

      const savedTrack = await track.save();

      await User.findByIdAndUpdate(user._id, {
        $set: {
          tracks: [...user.tracks, savedTrack._id]
        }
      });

      res.status(200).json({
        message: "New track has been added",
        track: savedTrack
      });
    } else {
      res.status(403).json({
        message: "Only an artist can add a track."
      });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};
