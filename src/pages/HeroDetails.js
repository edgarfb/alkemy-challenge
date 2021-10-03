import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card/Card";

function HeroDetails() {
  const { heroId } = useParams();
  const [heroDetails, setHeroDetails] = React.useState(null);

  const TOKEN_API = "1621075358241982";
  const CORS_ANYWARE = "https://cors.bridged.cc/";
  const baseUrl = `${CORS_ANYWARE}https://superheroapi.com/api/${TOKEN_API}/`;

  React.useEffect(() => {
    axios
      .get(`${baseUrl}${heroId}`)
      .then((res) => {
        let data = res.data;
        return setHeroDetails({
          image: data.image.url,
          peso: data.appearance.weight[1],
          altura: data.appearance.height[1],
          alias: data.name,
          nombre: data.biography["full-name"],
          colorOjos: data.appearance["eye-color"],
          colorDeCabello: data.appearance["hair-color"],
          lugarDeTrabajo: data.work.base,
        });
      })
      .catch((err) => console.log(err.response));
  }, [heroId]);

  return (
    <div className="row">
      <div className="col-md-4">
        {heroDetails && <Card src={heroDetails.image} />}
      </div>
      <div className="col-md-8">
        {heroDetails && (
          <ul class="list-group">
            <h5>{heroDetails.nombre}</h5>
            <li class="list-group-item">Alias: {heroDetails.alias}</li>
            <li class="list-group-item">
              Lugar de trabajo: {heroDetails.lugarDeTrabajo}
            </li>
            <li class="list-group-item">Altura: {heroDetails.altura}</li>
            <li class="list-group-item">Peso: {heroDetails.peso}</li>
            <li class="list-group-item">
              Color de ojos: {heroDetails.colorOjos}
            </li>
            <li class="list-group-item">
              Color de cabello: {heroDetails.colorDeCabello}
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default HeroDetails;
