import Album from "@/models/album";
import Track from "@/models/track";
import User from "@/models/user";
import { ROLE_ARTIST } from "@/constants/roles";

/**
 * @description Create new Album
 * @param {*} req
 * @param {*} res
 */
export const create = async (req, res) => {
  try {
    const {
      name,
      description,
      type,
      artist,
      tracks,
      published,
      publishedAt
    } = req.body;

    const cover = `/${req.file.path}`;

    const user = await User.findById(artist);
    const isArtist = user.role === ROLE_ARTIST;

    if (isArtist) {
      const album = new Album({
        name,
        description,
        type,
        cover,
        artist,
        tracks,
        published,
        publishedAt
      });

      const savedAlbum = await album.save();

      /**
       * Update prop "albums" in User model.
       */
      await User.findOneAndUpdate(
        { _id: user._id },
        {
          $set: {
            albums: [...user.albums, savedAlbum._id]
          }
        }
      );

      /**
       * Update prop "album" in Track model.
       */
      for (const track of tracks) {
        await Track.findOneAndUpdate(
          { _id: track },
          {
            $set: {
              album,
              cover
            }
          }
        );
      }

      res.status(200).json({
        message: "New album has been created",
        album: savedAlbum
      });
    } else {
      res.status(403).json({
        message: "Only an artist can create album."
      });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

/**
 * @description Get all albums
 * @param {*} req
 * @param {*} res
 */
export const getAll = async (req, res) => {
  try {
    const albums = await Album.find().populate("artist tracks");

    res.status(200).json({
      count: albums.length,
      albums
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};
