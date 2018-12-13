import Track from "@/models/track";
import User from "@/models/user";
import { ROLE_ARTIST } from "@/constants/roles";

/**
 * @description Update track
 * @param {*} req
 * @param {*} res
 */
export default async (req, res) => {
  try {
    const { artist } = req.body;
    const user = await User.findById(artist);
    const isArtist = user.role === ROLE_ARTIST;

    if (isArtist) {
      const updateProps = {};

      for (const [key, value] of Object.entries(req.body)) {
        updateProps[key] = value;
      }

      updateProps["cover"] = `/${req.file.path}`;

      const updatedTrack = await Track.findByIdAndUpdate(
        req.params.id,
        {
          $set: updateProps
        },
        { new: true }
      );

      res.status(200).json({
        message: "Track updated",
        data: updatedTrack
      });
    } else {
      res.status(403).json({
        message: "Only an artist can update a track."
      });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};
