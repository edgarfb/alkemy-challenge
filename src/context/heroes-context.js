import React from "react";
import AuthContext from "./auth-context";
import axios from "axios";

const TOKEN_API = process.env.REACT_APP_TOKEN_API;
const CORS_ANYWARE = process.env.REACT_APP_CORS_ANYWARE;
const searchUrl = `${CORS_ANYWARE}https://superheroapi.com/api/${TOKEN_API}/search/`;
const heroUrl = `${CORS_ANYWARE}https://superheroapi.com/api/${TOKEN_API}/`;

const HeroesContext = React.createContext(null);

export function HeroesProvider(props) {
  const [heroes, setHeroes] = React.useState();
  const [teamMembers, setTeamMembers] = React.useState([]);
  const [teamStats, setTeamStats] = React.useState({});
  const authCtx = React.useContext(AuthContext);

  function heroDetailsHandler(heroId, handler) {
    axios
      .get(`${heroUrl}${heroId}`, {
        headers: {
          "Content-Type": "aplication/json",
        },
      })
      .then((res) => {
        let data = res.data;
        return handler({
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
  }

  // This works find heroes based on his name
  function findHeroesHandler(inputName) {
    axios
      .get(`${searchUrl}${inputName}`)
      .then((res) => {
        let data = res.data.results;
        setHeroes(data);
      })

      .catch((error) => console.log(error.response));
  }

  // Add heroe
  function addHeroesHandler(hero) {
    if (teamMembers.length === 6) {
      alert("Maximo 6 heroes");
      return;
    }
    // Test if the hero already exist
    else if (teamMembers.some((h) => h.id === hero.id)) {
      alert("El Hero ya existe");
      return;
    }

    // fires the modal to user feedback
    authCtx.showModal();
    return setTeamMembers((prev) => {
      return [...prev, hero];
    });
  }

  // Remove Hero
  function removeHeroTeamHandler(heroId) {
    setTeamMembers(teamMembers.filter((hero) => hero.id !== heroId));
  }

  // Manages the stats
  React.useEffect(() => {
    let stats = teamMembers.map((stat) => {
      return stat.powerstats;
    });
    let getStats = (stat) => {
      if (stats.length === 0) {
        return;
      }
      return stats
        .map((s) => s[stat])
        .filter((s) => s !== "null")
        .reduce((a, b) => {
          return +a + +b;
        });
    };
    return setTeamStats({
      combat: getStats("combat"),
      durability: getStats("durability"),
      intelligence: getStats("intelligence"),
      power: getStats("power"),
      speed: getStats("speed"),
      strength: getStats("strength"),
    });
  }, [teamMembers]);

  return (
    <HeroesContext.Provider
      value={{
        heroes,
        teamMembers,
        teamStats,
        findHeroesHandler,
        addHeroesHandler,
        removeHeroTeamHandler,
        heroDetailsHandler,
      }}
    >
      {props.children}
    </HeroesContext.Provider>
  );
}

export default HeroesContext;
