import React from "react";
import Card from "../components/Card/Card";
import styles from "./Home.module.css";

function Welcome() {
  return (
    <div className={styles.welcome}>
      <h2>Crea tu super equipo</h2>
    </div>
  );
}

function Home(props) {
  return (
    <div className="row g-4">
      {props.heroes === undefined && <Welcome />}
      {props.heroes &&
        props.heroes.map((hero) => (
          <div className="col-md-3" key={hero.id}>
            <Card
              hero={hero}
              src={hero.image.url}
              name={hero.name}
              addBtn
              id={hero.id}
            />
          </div>
        ))}
    </div>
  );
}

export default Home;
