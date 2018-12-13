import bcrypt from "bcrypt";
import User from "@/models/user";

/**
 * @description Registration
 * @param {*} req
 * @param {*} res
 */
export default async (req, res) => {
  try {
    const { email, password, role, userName } = req.body;

    const user = await User.find({ email });

    if (user.length >= 1) {
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
              message: "User created",
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
