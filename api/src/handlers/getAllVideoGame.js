const { getAllVg } = require("../controllers/getAllVgCtrller");

module.exports = async (req, res) => {
  try {
    const allVideogames = await getAllVg();

    res.status(200).json(allVideogames);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
