import React from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card/Card";
import HeroesContext from "../context/heroes-context";

function HeroDetails() {
  const { heroId } = useParams();
  const [heroDetails, setHeroDetails] = React.useState(null);
  const heroesCtx = React.useContext(HeroesContext);

  React.useEffect(() => {
    heroesCtx.heroDetailsHandler(heroId, setHeroDetails);
  }, [heroId, heroesCtx]);

  return (
    <div className="row">
      <div className="col-md-4">
        {heroDetails && <Card src={heroDetails.image} />}
      </div>
      <div className="col-md-8">
        {heroDetails && (
          <ul className="list-group">
            <h5>{heroDetails.nombre}</h5>
            <li className="list-group-item">Alias: {heroDetails.alias}</li>
            <li className="list-group-item">
              Lugar de trabajo: {heroDetails.lugarDeTrabajo}
            </li>
            <li className="list-group-item">Altura: {heroDetails.altura}</li>
            <li className="list-group-item">Peso: {heroDetails.peso}</li>
            <li className="list-group-item">
              Color de ojos: {heroDetails.colorOjos}
            </li>
            <li className="list-group-item">
              Color de cabello: {heroDetails.colorDeCabello}
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default HeroDetails;
