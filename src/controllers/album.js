import Album from "@/models/album";

/**
 * @description Create new Album
 * @param {*} req
 * @param {*} res
 */
export const create = async (req, res) => {
  let photo, tracks;

  if (req.files.photo && req.files.tracks) {
    photo = await req.files.photo[0];
    tracks = await req.files.tracks.map(
      track => (track.path = `/${track.path}`)
    );
  }

  const album = new Album({
    name: req.body.name,
    type: req.body.type,
    artist: req.body.name,
    photo: `/${photo.path}`,
    tracks
  });

  try {
    const response = await album.save();
    res.status(200).json({
      message: "New album has been created",
      album: response
    });
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
  const albums = await Album.find();

  try {
    res.status(200).json({
      count: albums.length,
      albums
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};
