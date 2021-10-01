import React from "react";
import styles from "./Home.module.css";
import Card from "../components/Card/Card";
import BtnAddHero from "../components/UI/BtnAddHero";

function Home(props) {
  return (
    <div className="row g-4">
      {props.heroes &&
        props.heroes.map((hero) => (
          <div className="col-md-3">
            <Card
              onAddHeroToTeam={props.onAddHeroToTeam}
              hero={hero}
              src={hero.image.url}
              name={hero.name}
              // powerstats={hero.powerstats}
            />
            <div className="d-grid">
              <BtnAddHero
                className="btn btn-success"
                content="Agregar al equipo"
                onClick={() => props.onAddHeroToTeam(hero)}
              />
            </div>
          </div>
        ))}
    </div>
  );
}

export default Home;
