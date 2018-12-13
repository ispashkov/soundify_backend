import User from "@/models/user";

/**
 * @description Delete user
 * @param {*} req
 * @param {*} res
 */
export default async (req, res) => {
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
