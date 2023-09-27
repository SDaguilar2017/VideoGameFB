// "name":"Super Mario",
// "description":"Juejo que nace en Nintendo",
// "platforms":"Nintendo, Xbox, pc",
// "image":"https://url.com/imagen",
// "released":"1980-01-01",
// "rating":"4.9",

const postVgCtrller = require("../controllers/postVgCtrller");

module.exports = async (req, res) => {
  const { name, description, image, released, genres } = req.body;

  try {
    if (name === "") throw new Error("Videogames Requerido.");

    if (genres.length === 0)
      throw new Error("Deberia tener al menos un Género.");

    let { platforms, rating } = req.body;

    if (platforms.length === 0)
      throw new Error("Deberia tener al menos una Plataforma.");

    platforms = platforms.join(", ");
    rating = Number(rating);
    //console.log(name, description, platforms, image, released, rating, genres);

    if (!name || !description || !platforms || !image || !released || !rating)
      throw new Error("Faltan datos Necesarios");
    if (typeof rating !== "number" || rating > 5 || rating < 0)
      throw new Error("rating debe ser numerico y estar en el rango de 0 a 5");

    const nuevo = await postVgCtrller(
      name,
      description,
      platforms,
      image,
      released,
      rating,
      genres
    );
    res.status(200).json(nuevo);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
