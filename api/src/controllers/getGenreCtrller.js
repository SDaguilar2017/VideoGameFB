const axios = require("axios");
const { Genre } = require("../db");
const { API_Key, URL_GENRES } = process.env;

const getGenreCtrller = async () => {
  const respuesta = await axios.get(`${URL_GENRES}?key=${API_Key}`);
  let genres = respuesta.data.results.sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  );

  genres.forEach((gen) => {
    Genre.findOrCreate({
      where: { id: gen.id, name: gen.name, image: gen.image_background },
    });
  });
  genres = await Genre.findAll();
  return genres;
};

module.exports = {
  getGenreCtrller,
};
