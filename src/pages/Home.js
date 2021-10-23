import React from "react";
import Card from "../components/Card/Card";
import styles from "./Home.module.css";

function Welcome() {
  return (
    <div className={styles.welcome}>
      <h2 className="display-2 text-center mt-5">
        Forma tu equipo de heros y villanos
      </h2>
    </div>
  );
}

function Home(props) {
  console.log(props.heroes);
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
