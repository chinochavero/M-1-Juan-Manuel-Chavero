import styles from "../styles/Landing.module.css";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className={styles.container}>
      <h3 className={styles.text_welcome}>
        Aqui es donde tu viaje comienza.<br></br>
        Vive y conoce al mundo desde la experiencia compartida<br></br>
        con otros viajeros como tú!.
      </h3>
      <h1 className={styles.title}>Hora de volar</h1>
      <Link className={styles.link} to="/allposts">
      <button className={styles.btn_home}>Comienza</button>
      </Link>
      <img className={styles.home_img} src="../../src/images/airplane_back.jpg" alt="" />
    </div>
  );
}
export default HomePage;
