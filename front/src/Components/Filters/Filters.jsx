import React from "react";
import styles from "./Filters.module.css";
import { useDispatch, useSelector } from "react-redux";
import { filter, filterOrigin, order } from "../../redux/action";

export const Filters = () => {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);

  const handleOrder = (event) => {
    dispatch(order(event.target.value));
  };
  const handleFilter = (event) => {
    dispatch(filter(event.target.value));
  };
  const handleFilterOrigin = (event) => {
    dispatch(filterOrigin(event.target.value));
  };
  return (
    <div className={styles.containerFilters}>
      <select
        name="orden"
        defaultValue="orderChar"
        id="orden"
        onChange={handleOrder}
        className={styles.filterOrder}
      >
        <option value="orderChar" disabled="disabled">
          Ordenar por...
        </option>
        <option value="AZ">Nombre Ascendente</option>
        <option value="ZA">Nombre Descendente</option>
        <option value="RA">Rating Ascendente</option>
        <option value="RD">Rating Descendente</option>
      </select>
      <select
        name="filterOrigin"
        id="origin"
        onChange={handleFilterOrigin}
        defaultValue="All"
        className={styles.filterOrder}
      >
        <option value="All">Todos los Origenes</option>
        <option value="API">API</option>
        <option value="BD">Base de Datos</option>
      </select>
      <select
        name="filter"
        id="genre"
        onChange={handleFilter}
        defaultValue="All"
        className={styles.filterOrder}
      >
        <option value="All">Todos los Géneros</option>
        {genres.map((g) => (
          <option value={g.name} key={g.id}>
            {g.name}
          </option>
        ))}
      </select>
    </div>
  );
};
