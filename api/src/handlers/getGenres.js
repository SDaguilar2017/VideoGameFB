const { getGenreCtrller } = require("../controllers/getGenreCtrller");

module.exports = async (req, res) => {
  try {
    const Genres = await getGenreCtrller();
    res.status(200).json(Genres);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
