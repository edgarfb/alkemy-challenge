import React from "react";
import { useParams, Link } from "react-router-dom";
import Card from "../components/Card/Card";
import HeroesContext from "../context/heroes-context";

function HeroDetails() {
  const { heroId } = useParams();
  const [heroDetails, setHeroDetails] = React.useState(null);
  // let heroDetails = null;
  const heroesCtx = React.useContext(HeroesContext);

  React.useEffect(() => {
    heroesCtx.heroDetailsHandler(heroId, setHeroDetails);
  }, [heroId, heroesCtx]);

  return (
    <div className="row">
      <div className="col-md-4">
        {heroDetails && <Card src={heroDetails.image.url} />}
      </div>
      <div className="col-md-8">
        {heroDetails && (
          <ul className="list-group">
            <h5 className="text-center h3">
              {heroDetails.biography["full-name"]}
            </h5>
            <li className="list-group-item">
              Alias: {heroDetails.biography["alter-egos"]}
            </li>
            <li className="list-group-item">
              Lugar de trabajo: {heroDetails.work.base}
            </li>
            <li className="list-group-item">
              Altura: {heroDetails.appearance.height[1]}
              {/* continue here */}
            </li>
            <li className="list-group-item">
              Peso: {heroDetails.appearance.weight[1]}
            </li>
            <li className="list-group-item">
              Color de ojos: {heroDetails.appearance["eye-color"]}
            </li>
            <li className="list-group-item">
              Color de cabello: {heroDetails.appearance["hair-color"]}
            </li>
          </ul>
        )}
      </div>
      {heroDetails && (
        <div className="d-flex justify-content-center">
          <Link to="/heroes" className="btn btn-secondary">
            Volver
          </Link>
        </div>
      )}
    </div>
  );
}

export default HeroDetails;
