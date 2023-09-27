import styles from "./Detail.module.css";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import Loader from "../../Components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { cleanDetail, getDetail } from "../../redux/action";

const Detail = () => {
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.detailVg);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetail(id));
    return () => {
      dispatch(cleanDetail());
    };
  }, [id]);

  return (
    <div className={styles.centrado}>
      {!detail.name ? (
        <Loader />
      ) : (
        <div className={styles.containerDetail}>
          <h1>
            {id} - {detail.name}
          </h1>
          <Link to={"/home"}>
            <span>Atras</span>
          </Link>

          <span
            className={styles.desc}
            dangerouslySetInnerHTML={{ __html: detail.description }}
          ></span>
          <div className={styles.divExp}>
            <img src={detail?.image} alt={detail.name} />
            <div className={styles.divDatos}>
              <h2>Plataformas: </h2>
              <h2> {detail.platforms}</h2>
              <h2>Fecha de lanzamiento:</h2>
              <h2>{detail.released}</h2>
              <h2>Rating: {detail.rating}</h2>
              <h2>Géneros:</h2>
              <div>
                {detail.genres.map((g) => (
                  <h3 key={g + 1}>{g}</h3>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Detail;
