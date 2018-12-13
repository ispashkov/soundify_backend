import Track from "@/models/track";

/**
 * @description Remove track
 * @param {*} req
 * @param {*} res
 */
export default async (req, res) => {
  try {
    const { id } = req.params;

    await Track.findOneAndDelete({ _id: id });

    res.status(200).json({
      message: "Track deleted"
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};
