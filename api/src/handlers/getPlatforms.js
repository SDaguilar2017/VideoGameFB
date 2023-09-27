const { getPlatformsCtrller } = require("../controllers/getPlatformsCtrller");

module.exports = async (req, res) => {
  try {
    const Platforms = await getPlatformsCtrller();
    res.status(200).json(Platforms);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
