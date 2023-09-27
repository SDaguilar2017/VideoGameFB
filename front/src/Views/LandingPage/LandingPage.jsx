import { useNavigate } from "react-router-dom";
import styles from "./LandingPage.module.css";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const navegate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.tapar}>
        <label htmlFor="">Videogames App</label>
        <Link to="/home">
          <div className={styles.border}>
            <button type="button"> START </button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
