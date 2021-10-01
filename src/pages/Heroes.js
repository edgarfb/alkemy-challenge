import React from "react";
import Card from "../components/Card/Card";
import BtnAddHero from "../components/UI/BtnAddHero";
import StatsBar from "../components/UI/StatsBar";
import { Link } from "react-router-dom";

function Heroes(props) {
  // const v = props.teamMembers.map((hero) => {
  //   return hero.powerstats.speed;
  // });

  React.useEffect(() => {}, []);

  // console.log("mapeo", v);
  return (
    <div className="row g-4">
      <div className="col-md-8">
        <div className="row">
          {props.teamMembers &&
            props.teamMembers.map((hero) => (
              <div className="col-md-4" key={hero.id}>
                <Card
                  onAddHeroToTeam={props.onAddHeroToTeam}
                  hero={hero}
                  src={hero.image.url}
                  name={hero.name}
                  powerstats={hero.powerstats}
                />
                <div className="d-grid gap-2">
                  <BtnAddHero
                    className="btn btn-danger"
                    content="Quitar del equipo"
                    onClick={() => props.onRemoveHeroTeam(hero.id)}
                  />
                  <Link
                    className="btn btn-primary"
                    to={`/hero-details/${hero.id}`}
                  >
                    Detalles
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="col-md-4">
        <h2>Team Stats</h2>
        {props.teamMembers &&
          props.teamMembers.map((hero) => {
            console.log("hero from col 4", hero.powerstats);
          })}
        <StatsBar />
      </div>
    </div>
  );
}

export default Heroes;
