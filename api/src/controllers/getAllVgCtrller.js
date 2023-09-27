const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { API_Key, URL_GAMES } = process.env;

const getAllVg = async () => {
  let URL = `${URL_GAMES}?key=${API_Key}&page_size=40`;

  let resultado = await axios.get(URL);

  URL = resultado.data.next;

  const pagUno = resultado.data.results;

  resultado = await axios.get(URL);

  URL = resultado.data.next;
  const pagDos = resultado.data.results;

  resultado = await axios.get(URL);

  const pagTres = resultado.data.results;

  let apiVgs = [...pagUno, ...pagDos, ...pagTres];

  const mapVgs = apiVgs.map((vg) => {
    return {
      id: vg.id,
      name: vg.name,
      platforms: vg.platforms.map((plat) => plat.platform.name).join(", "),
      image: vg.background_image,
      released: vg.released,
      rating: vg.rating,
      genres: vg.genres.map((g) => g.name),
      created: false,
    };
  });

  const bdVgs = await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  const bdVgsFormat = bdVgs.map((vg) => {
    return {
      id: vg.id,
      name: vg.name,
      platforms: vg.platforms,
      image: vg.image,
      released: vg.released,
      rating: Number(vg.rating),
      genres: vg.Genres.map((g) => g.name),
      created: true,
    };
  });

  const allVgs = [...bdVgsFormat, ...mapVgs];
  return allVgs;
};

module.exports = {
  getAllVg,
};
