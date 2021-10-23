import React from "react";
import Card from "../components/Card/Card";
import BtnAddHero from "../components/UI/BtnAddHero";
import HeroesContext from "../context/heroes-context";

function Home(props) {
  const heroesCtx = React.useContext(HeroesContext);
  return (
    <div className="row g-4">
      {props.heroes &&
        props.heroes.map((hero) => (
          <div className="col-md-3" key={hero.id}>
            <Card hero={hero} src={hero.image.url} name={hero.name} />
            <div className="d-grid">
              <BtnAddHero
                className="btn btn-success"
                content="Agregar al equipo"
                onClick={() => heroesCtx.addHeroesHandler(hero)}
              />
            </div>
          </div>
        ))}
    </div>
  );
}

export default Home;
