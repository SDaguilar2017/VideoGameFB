import style from "./NavBar.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import { Filters } from "../Filters/Filters";

export default function NavBar(props) {
  const { onSearch } = props;

  return (
    <div className={style.divNav}>
      <Link to="/">
        <img src="gamer-zone.png" alt="Logo" />
      </Link>
      <Link to="/home">
        <button>Home</button>
      </Link>
      <Link to="/create">
        <button>Nuevo VIDEOGAMES</button>
      </Link>
      <Filters />
      <SearchBar className={style.SearchBar} onSearch={onSearch} />
    </div>
  );
}
