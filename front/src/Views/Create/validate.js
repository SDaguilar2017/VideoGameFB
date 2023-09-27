const error = {
  name: "",
  description: "",
  platforms: "",
  image: "",
  released: "",
  rating: "",
  genres: "",
};
export const validate = (state, nameError) => {
  switch (nameError) {
    case "name":
      if (state[nameError] === "") error[nameError] = "El nombre es requerido.";
      else if (state[nameError].length < 5 || state[nameError].length >= 40)
        error[nameError] = "El nombre debe contener entre 5 y 40 caracteres.";
      else error[nameError] = "";

      return error;
    case "description":
      if (state[nameError] === "")
        error[nameError] = "La descripción es requerida.";
      else if (state[nameError].length < 5 || state[nameError].length > 50)
        error[nameError] =
          "La descripción debe contener entre 5 y 50 caracteres.";
      else error[nameError] = "";

      return error;
    case "platforms":
      if (state[nameError].length === 0)
        error[nameError] = "Debe ingresar al menos una plataforma.";
      else error[nameError] = "";

      return error;
    case "image":
      if (state[nameError] === "") error[nameError] = "El nombre es requerido.";
      else if (
        !/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(state[nameError])
      )
        error[nameError] = "Debe ser una URL.-";
      else error[nameError] = "";

      return error;
    case "released":
      const today = new Date();
      const date = new Date(state[nameError]);
      const ochenta = new Date("1980/01/01");
      if (state[nameError] === "")
        error[nameError] = "La fecha es un dato requerido.";
      else if (
        /^(?:3[01]|[12][0-9]|0?[1-9])([\-/.])(0?[1-9]|1[1-2])\1\d{4}$/.test(
          state[nameError]
        )
      )
        error[nameError] = "Debe ser una fecha valida";
      else if (date > today)
        error[nameError] = "La fecha no puede ser del futuro.-";
      else if (ochenta > date)
        error[nameError] = "La fecha no puede se menor que 01/01/1980";
      else error[nameError] = "";
      console.log(error);
      return error;
    case "rating":
      if (state[nameError] === "") error[nameError] = "El nombre es requerido.";
      else if (isNaN(parseInt(state[nameError])))
        error[nameError] = "El rating debe ser numérico.-";
      else if (state[nameError] < 0)
        error[nameError] = "El rating no puede ser negativo.-";
      else if (state[nameError] > 5)
        error[nameError] = "El rating debe ser menor que 5-";
      else error[nameError] = "";
      console.log(error);
      return error;
    case "genres":
      if (state[nameError].length === 0)
        error[nameError] = "Debe contener al menos un Género.";
      else error[nameError] = "";
      console.log(error);
      return error;
    default:
  }
};
