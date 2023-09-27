const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { Op } = require("sequelize");
const { API_Key, URL_GAMES } = process.env;

module.exports = async (name) => {
  const response = await axios.get(
    `${URL_GAMES}?key=${API_Key}&search=${name}&page_size=15`
  );
  const apiVgByName = response.data.results.map((vg) => {
    return {
      id: vg.id,
      name: vg.name,
      description: vg.description ? vg.description : vg.name,
      platforms: vg.platforms.map((plat) => plat.platform.name).join(", "),
      image: vg.background_image,
      released: vg.released,
      rating: vg.rating,
      genres: vg.genres.map((g) => g.name),
    };
  });
  const nombre = `%${name}%`;
  const dbVgByName = await Videogame.findAll({
    where: { name: { [Op.iLike]: nombre } },
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  const dbVgsFormated = dbVgByName.map((vg) => {
    return {
      id: vg.id,
      name: vg.name,
      description: vg.description,
      platforms: vg.platforms,
      image: vg.image,
      released: vg.released,
      rating: Number(vg.rating),
      genres: vg.Genres.map((g) => g.name),
    };
  });
  let vgByName = [...dbVgsFormated, ...apiVgByName];
  if (vgByName.length === 0)
    throw new Error("No existe Videogames con ese nombre");
  if (vgByName.length > 15) vgByName = vgByName.splice(0, 15);
  return vgByName;
};
