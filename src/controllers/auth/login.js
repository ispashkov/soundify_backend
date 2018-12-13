import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "@/models/user";

/**
 * @description Login
 * @param {*} req
 * @param {*} res
 */
export default async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const payload = {
        id: user._id,
        email: user.email
      };

      jwt.sign(
        payload,
        process.env.JWT_KEY,
        {
          expiresIn: "1h"
        },
        (err, token) => {
          user.password = null;

          res.status(200).json({
            message: "Auth successful",
            token,
            user
          });
        }
      );
    } else {
      res.status(400).json({
        error: "Password incorrect"
      });
    }
  } catch (err) {
    res.status(404).json({
      error: err.message
    });
  }
};
