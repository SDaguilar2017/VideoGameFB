import styles from "./Card.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";

const Card = ({ id, name, image, genres }) => {
  const [loaded, setLoaded] = useState(true);

  useEffect(() => {
    setLoaded(false);
  }, []);
  return loaded ? (
    <Loader />
  ) : (
    <>
      <Link to={`/detail/${id}`} className={styles.linked}>
        <div className={styles.container}>
          <div className={styles.containerImg}>
            <img src={image} alt={name} />
          </div>
          <h2 className={styles.titleName}>{name}</h2>
          <div className={styles.gen}>
            Géneros:
            {genres.map((g) => (
              <span key={g}> {g} </span>
            ))}
          </div>
        </div>
      </Link>
    </>
  );
};

export default Card;
