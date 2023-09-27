import styles from "./cards.module.css";
import Card from "../Card/Card";
import { useDispatch, useSelector } from "react-redux";
import {
  getGenres,
  getPlatforms,
  getVideogames,
  page,
} from "../../redux/action";
import { useEffect } from "react";

const Cards = (Props) => {
  const btns = [];
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  const allVideogames = useSelector((state) => state.allVideogames);
  const allVideogamesBackup = useSelector((state) => state.allVideogamesBackup);

  for (let i = 1; i <= Math.ceil(allVideogamesBackup.length / 15); i++) {
    btns.push(i);
  }

  useEffect(() => {
    dispatch(getVideogames());
    dispatch(getGenres());
    dispatch(getPlatforms());
  }, [dispatch]);

  const currentPage = useSelector((state) => state.currentPage);

  const pagination = (e) => {
    let order = e.target.name;
    if (!isNaN(order)) order--;
    dispatch(page(order));
  };

  return (
    <div className={styles.container}>
      <div className={styles.pagination}>
        <button name="prev" onClick={pagination}>
          {"<"}
        </button>
        {btns.map((btn) => (
          <button
            key={btn}
            name={btn}
            className={`${currentPage + 1 === btn ? styles.currentBtn : ""}`}
            onClick={pagination}
          >
            {btn}
          </button>
        ))}
        <button name="next" onClick={pagination}>
          {">"}
        </button>
      </div>
      {allVideogames.map((vg) => (
        <Card
          key={vg.id}
          id={vg.id}
          image={vg.image}
          name={vg.name}
          genres={vg.genres}
        />
      ))}
    </div>
  );
};

export default Cards;
