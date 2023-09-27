import styles from "./Home.module.css";
import React, { useEffect } from "react";
import Cards from "../../Components/Cards/Cards";
import { useDispatch } from "react-redux";
import { getVideogames } from "../../redux/action";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);

  return (
    <div className={styles.containerHome}>
      <Cards />
    </div>
  );
};

export default Home;
