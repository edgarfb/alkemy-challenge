import React from "react";
import Card from "../components/Card/Card";
import BtnAddHero from "../components/UI/BtnAddHero";
import StatsBar from "../components/UI/StatsBar";
import { Link } from "react-router-dom";

function Heroes(props) {
  let teamsKeys =
    props.teamMembers.length > 0
      ? Object.keys(props.teamMembers[0].powerstats)
      : [];
  let teamOnLocalstorage = JSON.parse(
    localStorage.getItem("teamOnLocalstorage")
  );
  console.log(teamOnLocalstorage);
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
        <h2 className="text-center">Team Stats</h2>
        {teamsKeys.map((k) => {
          return (
            <React.Fragment>
              <h5>{k.toUpperCase()}</h5>
              <StatsBar
                width={props.teamStats[k] / props.teamMembers.length}
                value={Math.floor(
                  props.teamStats[k] / props.teamMembers.length
                )}
              />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default Heroes;
