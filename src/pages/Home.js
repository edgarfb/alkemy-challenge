import React from "react";
import styles from "./Home.module.css";
import Card from "../components/Card/Card";

function Home(props) {
  // console.log(props.heroes);
  return (
    <div className="row">
      {props.heroes &&
        props.heroes.map((hero) => (
          <Card src={hero.image.url} name={hero.name} />
        ))}
    </div>
  );
}

export default Home;
