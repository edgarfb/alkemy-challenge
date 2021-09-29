import React from "react";
import styles from "./Home.module.css";
import Card from "../components/Card/Card";

function Home(props) {
  // console.log(props.heroes);
  return (
    <div className="row g-4">
      {props.heroes &&
        props.heroes.map((hero) => (
          <div className="col-3">
            <Card
              src={hero.image.url}
              name={hero.name}
              powerstats={hero.powerstats}
            />
          </div>
        ))}
    </div>
  );
}

export default Home;
