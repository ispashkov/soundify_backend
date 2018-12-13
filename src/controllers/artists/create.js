import bcrypt from "bcrypt";
import User from "@/models/user";
import { ROLE_ARTIST } from "@/constants/roles";

/**
 * Create Artist
 * @param {*} req
 * @param {*} res
 */
export default async (req, res) => {
  try {
    const { email, password, role, userName } = req.body;

    const user = await User.find({ email });

    if (role !== ROLE_ARTIST) {
      return res.status(403).json({
        message: "Bad role"
      });
    } else if (user.length >= 1) {
      return res.status(409).json({
        message: "Mail exists"
      });
    } else {
      bcrypt.hash(password, 10, async (error, hash) => {
        try {
          if (error) {
            return res.status(500).json({
              error
            });
          } else {
            const newUser = new User({
              email,
              password: hash,
              role,
              userName
            });

            const createdUser = await newUser.save();
            createdUser.password = null;

            res.status(201).json({
              message: "Artist created",
              data: createdUser
            });
          }
        } catch (error) {
          res.status(500).json({
            error
          });
        }
      });
    }
  } catch (error) {
    res.status(500).json({
      error
    });
  }
};
