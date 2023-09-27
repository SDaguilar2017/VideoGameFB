const getVideogamesById = require("../controllers/getVideogamesById");

module.exports = async (req, res) => {
  const { id } = req.params;
  try {
    const Detalle = await getVideogamesById(id);

    if (!Detalle.name) throw new Error("Videogame no disponible");

    res.status(200).json(Detalle);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
