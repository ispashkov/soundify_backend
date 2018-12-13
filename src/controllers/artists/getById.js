import User from "@/models/user";
import { ROLE_ARTIST } from "@/constants/roles";

/**
 * Get Artist by id
 * @param {*} req
 * @param {*} res
 */
export default async (req, res) => {
  try {
    const { id } = req.params;

    const artist = await User.findById(id, { role: ROLE_ARTIST });

    res.status(200).json({
      massage: "Artist has been loaded",
      data: artist
    });
  } catch (e) {
    throw new Error(e);
  }
};
