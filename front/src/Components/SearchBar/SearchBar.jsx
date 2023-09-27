import { useState } from "react";
import style from "./SearchBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getByName, getVideogames, page } from "../../redux/action";
import { FiSearch } from "react-icons/fi";

export default function SearchBar(props) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [boton, setBoton] = useState("Buscar");
  const currentPage = useSelector((state) => state.currentPage);

  const search = () => {
    if (name === "") {
      dispatch(page(currentPage));
      setBoton("Buscar");
    } else {
      dispatch(getByName(name));
      setBoton("Mostrar Todos");
      setName("");
    }
  };
  const handleChange = (event) => {
    setName(event.target.value);
    if (event.target.value === "") setBoton("Mostrar Todos");
    else setBoton("Buscar");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      search();
    }
  };

  return (
    <div className={style.divDos}>
      <input
        type="search"
        placeholder="Buscar por Nombre"
        onChange={handleChange}
        value={name}
      />
      {/* <FiSearch className={style.search} onClick={search} /> */}
      <button id="Buscar" onClick={search} onKeyDown={handleKeyDown}>
        {boton}
      </button>
    </div>
  );
}
