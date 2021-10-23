import React from "react";
import Card from "../components/Card/Card";

import StatsBar from "../components/UI/StatsBar";

function Heroes(props) {
  let teamsKeys =
    props.teamMembers.length > 0
      ? Object.keys(props.teamMembers[0].powerstats)
      : [];

  return (
    <div className="row g-4">
      <div className="col-md-8">
        <div className="row">
          {props.teamMembers &&
            props.teamMembers.map((hero) => (
              <div className="col-md-4" key={hero.id}>
                <Card
                  hero={hero}
                  id={hero.id}
                  src={hero.image.url}
                  name={hero.name}
                  powerstats={hero.powerstats}
                  removeBtn
                  detailsBtn
                />
              </div>
            ))}
        </div>
      </div>
      <div className="col-md-4">
        {props.teamMembers.length > 0 && (
          <h2 className="text-center">Estadísticas del equipo</h2>
        )}
        {teamsKeys.map((k) => {
          return (
            <React.Fragment>
              <h5>{k.toUpperCase()}</h5>
              <StatsBar
                key={k}
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
