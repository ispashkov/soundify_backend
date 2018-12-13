import Track from "@/models/track";

export default async (req, res) => {
  try {
    const { id } = req.params;
    const track = await Track.findById(id).populate("artist");

    res.status(200).json(track);
  } catch (error) {
    res.status(500).json({ error });
  }
};
