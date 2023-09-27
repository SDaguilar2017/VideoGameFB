import React, { useState } from "react";
import styles from "./Create.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postVideogames } from "../../redux/action";
import { validate } from "./validate";

const Create = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const stateInicial = {
    name: "",
    description: "",
    platforms: [],
    image: "",
    released: "",
    rating: 0,
    genres: [],
  };

  const [state, setState] = useState(stateInicial);
  const [errors, setErrors] = useState({});

  const platforms = useSelector((state) => state.platforms);
  const genres = useSelector((state) => state.genres);

  const handlerChange = (event) => {
    const nombreP = event.target.name;
    const valorP = event.target.value;

    //RE-RENDERIZADO
    setErrors(validate({ ...state, [nombreP]: valorP }, nombreP));
    console.log(errors);

    if (nombreP === "platforms") {
      if (state.platforms.includes(valorP)) return;
      setState({ ...state, [nombreP]: [...state[nombreP], valorP] });
      return;
    }
    if (nombreP === "genres") {
      if (state.platforms.includes(valorP)) return;
      setState({
        ...state,
        [nombreP]: [...state[nombreP], valorP],
      });
      return;
    }
    setState({
      ...state,
      [nombreP]: valorP,
    });
  };

  const remove = (e) => {
    setErrors(
      validate(
        {
          ...state,
          [e.target.name]: [
            ...state[e.target.name].filter((x) => x !== e.target.id),
          ],
        },
        e.target.name
      )
    );
    setState({
      ...state,
      [e.target.name]: [
        ...state[e.target.name].filter((x) => x !== e.target.id),
      ],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postVideogames(state));
    navigate("/home");
  };

  const buttondisabled = () => {
    if (
      state.name === "" ||
      state.description === "" ||
      state.platforms.length === 0 ||
      state.image === "" ||
      state.released === "" ||
      state.rating === "" ||
      state.genres.length === 0
    )
      return true;
    let aux = true;
    for (let err in errors) {
      if (errors[err] === "") aux = false;
      else {
        aux = true;
        break;
      }
    }
    return aux;
  };

  return (
    <div className={styles.containerCreate}>
      <h1>Nuevo VideoGame</h1>
      <div className={styles.formRender}>
        <form onSubmit={handleSubmit} className={styles.formulario}>
          <label>Nombre: </label>
          <input
            onChange={handlerChange}
            type="text"
            name="name"
            placeholder="Nombre"
          />
          <span className={styles.errores}>{errors.name}</span>
          <label>Descripción: </label>
          <input
            onChange={handlerChange}
            type="text"
            name="description"
            placeholder="Descripción"
          />
          <span className={styles.errores}>{errors.description}</span>
          <label>Plataformas: </label>
          <select
            name="platforms"
            defaultValue="platform"
            onChange={handlerChange}
          >
            <option value="platform" disabled="disabled">
              Plataformas...
            </option>
            {platforms.map((p) => (
              <option key={p.id} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
          <span className={styles.errores}>{errors.platforms}</span>
          {state.platforms.map((p) => (
            <div>
              <span key={p}>{p}</span>
              <button
                key="p"
                type="button"
                id={p}
                name="platforms"
                onClick={remove}
              >
                x
              </button>
            </div>
          ))}
          <label>Imagen (URL): </label>
          <input
            onChange={handlerChange}
            type="text"
            name="image"
            placeholder="URL de Imagen"
          />
          <span className={styles.errores}>{errors.image}</span>
          <label>Fecha de Lanzamiento: </label>
          <input onChange={handlerChange} type="date" name="released" />
          <span className={styles.errores}>{errors.released}</span>
          <label>Rating: </label>
          <input onChange={handlerChange} type="text" name="rating" />
          <span className={styles.errores}>{errors.rating}</span>
          <label>Géneros: </label>
          <select onChange={handlerChange} name="genres" defaultValue="genre">
            <option value="genre" disabled="disabled">
              Generos...
            </option>
            {genres.map((g) => (
              <option key={g.id} value={g.name}>
                {g.name}
              </option>
            ))}
          </select>
          <span className={styles.errores}>{errors.genres}</span>
          {state.genres.map((g) => (
            <div>
              <span key={g}>{g}</span>
              <button type="button" id={g} name="genres" onClick={remove}>
                x
              </button>
            </div>
          ))}
          <button type="submit" disabled={buttondisabled()}>
            Crear
          </button>
        </form>
        <div className={styles.CardRenderizada}>
          <h2>Nombre: {state.name}</h2>
          <p>{state.description}</p>
          <h3 id={styles.arrays}>Plataformas: {state.platforms.join(", ")} </h3>
          <img src={state.image} />
          <h3>Fecha de Lanzamiento: {state.released}</h3>
          <h3>Rating: {state.rating}</h3>
          <h3 id={styles.arrays}>Géneros: {state.genres.join(", ")}</h3>
        </div>
      </div>
    </div>
  );
};

export default Create;
