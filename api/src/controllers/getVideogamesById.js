const axios = require("axios");
const { Videogame, Genre } = require("../db");

const { API_Key, URL_GAMES } = process.env;
const Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
//const uuid = "123e4567-e89b-12d3-a456-426655440000";

module.exports = async (id) => {
  if (id.match(Regex)) {
    console.log(id);
    const detail = await Videogame?.findByPk(id, {
      include: {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    const detailBD = {
      id: detail.id,
      name: detail.name,
      description: detail.description,
      platforms: detail.platforms,
      image: detail.image,
      released: detail.released,
      rating: Number(detail.rating),
      genres: detail.Genres.map((g) => g.name),
    };

    if (!detailBD) throw new Error("Id inexistente en la Base de Datos");
    return detailBD;
  }
  if (!isNaN(Number(id))) {
    if (parseInt(id) >= 850000)
      throw new Error("El id es mayor a la cantidad de Juegos disponibles");
    const response = await axios.get(`${URL_GAMES}/${id}?key=${API_Key}`);

    const detail = response.data;
    const detailById = {
      id: detail.id,
      name: detail.name,
      description: detail.description,
      platforms: detail.platforms.map((plat) => plat.platform.name).join(", "),
      image: detail.background_image,
      image2: detail.background_image_additional,
      released: detail.released,
      rating: detail.rating,
      genres: detail.genres.map((g) => g.name),
    };

    return detailById;
  }

  throw new Error("No es un id valido");
};
