const { Videogame, Genre } = require("../db");
const { Op } = require("sequelize");

module.exports = async (
  name,
  description,
  platforms,
  image,
  released,
  rating,
  genres
) => {
  const videogamesExist = await Videogame.findOne({ where: { name } });

  if (videogamesExist) {
    throw new Error("Videogames Existente.-");
  }

  let newVg = await Videogame.create({
    name,
    description,
    platforms,
    image,
    released,
    rating,
  });

  genres.forEach(async (g) => {
    let genresDB = await Genre.findAll({ where: { name: g } });
    await newVg.addGenre(genresDB);
  });

  const newGen = await newVg.getGenres();

  const newVgFormated = {
    id: newVg.id,
    name: newVg.name,
    description: newVg.description,
    platforms: newVg.platforms,
    image: image,
    released: newVg.released,
    rating: Number(newVg.rating),
    genres: newGen.map((g) => g.name),
  };
  return {
    status: 200,
    message: "Videogames Creado con exito.",
    newVgFormated,
  };
};
