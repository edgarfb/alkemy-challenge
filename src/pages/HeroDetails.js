import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card/Card";

function HeroDetails() {
  const { heroId } = useParams();
  const [heroDetails, setHeroDetails] = React.useState(null);

  const TOKEN_API = "1621075358241982";
  const CORS_ANYWARE = "https://cors-anywhere.herokuapp.com/";
  const baseUrl = `${CORS_ANYWARE}https://superheroapi.com/api/${TOKEN_API}/`;

  console.log(heroDetails);
  React.useEffect(() => {
    axios
      .get(`${baseUrl}${heroId}`)
      .then((res) => setHeroDetails({ ...res.data }))
      .catch((err) => console.log(err.response));
  }, [heroId]);
  return (
    <div className="row">
      <div className="col-md-4">
        {heroDetails && <Card src={heroDetails.image.url} />}
      </div>
      <div className="col-md-8"></div>
    </div>
  );
}

export default HeroDetails;
