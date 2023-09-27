const { Router } = require("express");
const getById = require("../handlers/getById");
const postVideoGame = require("../handlers/PostVideoGame");
const getAllVideoGame = require("../handlers/getAllVideoGame");
const getGenres = require("../handlers/getGenres");
const getByName = require("../handlers/getByName");
const getPlatforms = require("../handlers/getPlatforms");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);s

router.get("/videogames/name", getByName);

router.get("/videogames/:id", getById);

router.get("/videogames", getAllVideoGame);

router.post("/videogames", postVideoGame);

router.get("/genres", getGenres);

router.get("/platforms", getPlatforms);

module.exports = router;
