import Track from "@/models/track";
import User from "@/models/user";
import { ROLE_ARTIST } from "@/constants/roles";

/**
 * @description Create new track
 * @param {*} req
 * @param {*} res
 */
export const create = async (req, res) => {
  try {
    const { name, artist_id } = req.body;

    const user = await User.findById(artist_id);
    const isArtist = user.role === ROLE_ARTIST;

    if (isArtist) {
      const track = new Track({
        name,
        artist_id,
        cover: `/${req.file.path}`
      });

      const response = await track.save();

      res.status(200).json({
        message: "New track has been added",
        track: response
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

/**
 * @description Get all tracks
 * @param {*} req
 * @param {*} res
 */
export const getAll = async (req, res) => {
  try {
    const tracks = await Track.find();

    res.status(200).json({
      count: tracks.length,
      tracks
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

/**
 * Get track by id
 * @param {*} req
 * @param {*} res
 */
export const get = async (req, res) => {
  const track = await Track.findById(req.params.id);

  try {
    res.status(200).json(track);
  } catch (error) {
    res.status(500).json({ error });
  }
};

/**
 * @description Update track
 * @param {*} req
 * @param {*} res
 */
export const update = async (req, res) => {
  try {
    const { artist_id } = req.body;
    const user = await User.findById(artist_id);
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

/**
 * @description Remove track
 * @param {*} req
 * @param {*} res
 */
export const remove = async (req, res) => {
  try {
    await Track.findByIdAndRemove(req.params.id);
    res.status(200).json({
      message: "Track deleted"
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};
