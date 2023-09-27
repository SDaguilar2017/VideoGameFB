const getByNameCtrller = require("../controllers/getByNameCtrller");

module.exports = async (req, res) => {
  const { name } = req.query;
  try {
    const respuesta = await getByNameCtrller(name);
    res.status(200).json(respuesta);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
