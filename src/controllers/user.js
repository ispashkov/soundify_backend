import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "@/models/user";

/**
 * @description Registration
 * @param {*} req
 * @param {*} res
 */
export const signup = async (req, res) => {
  try {
    const { email, password, role, firstName, secondName } = req.body;

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
              firstName,
              secondName
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

/**
 * @description Login
 * @param {*} req
 * @param {*} res
 */
export const login = async (req, res) => {
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

/**
 * @description Delete user
 * @param {*} req
 * @param {*} res
 */
export const remove = async (req, res) => {
  try {
    User.remove({ id: req.params.id });
    res.status(200).json({
      message: "User deleted"
    });
  } catch (err) {
    res.status(500).json({
      error: err
    });
  }
};

/**
 * @description Get current user
 * @param {*} req
 * @param {*} res
 */
export const current = (req, res) => res.json({ ...req.user, password: null });
