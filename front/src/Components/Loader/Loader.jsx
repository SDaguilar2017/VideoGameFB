import React from "react";
import style from "./Loader.module.css"; // Asegúrate de que este import apunte al archivo CSS que contiene los estilos

const Loader = () => {
  const spanArray = Array.from({ length: 20 }, (_, i) => i + 1);

  return (
    <section className={style.loaderSection}>
      <div className={style.loader}>
        {spanArray.map((i) => (
          <span key={i} style={{ "--i": i }}></span>
        ))}
      </div>
    </section>
  );
};

export default Loader;

{
  /* <svg viewBox="0 0 100 100">
<circle cx="50" cy="50" r="40" stroke="none" fill="white" />
<path
  d="M50 50 A40 40 0 0 1 10 50 A40 40 0 0 1 50 10"
  stroke="black"
/>
</svg> */
}
