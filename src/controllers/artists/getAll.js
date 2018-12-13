import User from "@/models/user";
import { ROLE_ARTIST } from "@/constants/roles";

/**
 * Get all Artists
 * @param {*} req
 * @param {*} res
 */
export default async (req, res) => {
  try {
    const artists = await User.find({ role: ROLE_ARTIST });

    res.status(200).json({
      message: "Artists has been loaded",
      data: artists
    });
  } catch (e) {
    throw new Error(e);
  }
};
