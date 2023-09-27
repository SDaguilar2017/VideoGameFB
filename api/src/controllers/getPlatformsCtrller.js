const axios = require("axios");
const { API_Key, URL_PLATFORMS } = process.env;

const getPlatformsCtrller = async () => {
  const respuesta = await axios.get(`${URL_PLATFORMS}?key=${API_Key}`);
  let platforms = respuesta.data.results.sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  );

  const platformsResponse = platforms.map((p) => {
    return { id: p.id, name: p.name };
  });

  return platformsResponse;
};

module.exports = {
  getPlatformsCtrller,
};
