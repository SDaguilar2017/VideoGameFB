import style from "./Error404.module.css";
import { Link } from "react-router-dom";
const Error404 = () => {
  return (
    <div className={style.divError404}>
      <div className={style.container404}>
        <h1>Pagina inexistente </h1>
        <h1>Status 404</h1>
        <Link to="/home">
          <img
            src="../../public/futurama-philip-j-fry.gif"
            alt=""
            sizes=""
            srcset=""
          />
        </Link>
        <p>Click en la Imagen para ir a Home</p>
      </div>
    </div>
  );
};
export default Error404;
