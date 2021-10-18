import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import "./App.css";
import axios from "axios";
import LogIn from "./components/LogIn/LogIn";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import Heroes from "./pages/Heroes";
import SearchHeroes from "./components/SearchHeroes.js/SearchHeroes";
import HeroDetails from "./pages/HeroDetails";
import AuthContext from "./context/auth-context";

const TOKEN_API = process.env.REACT_APP_TOKEN_API;
const CORS_ANYWARE = process.env.REACT_APP_CORS_ANYWARE;
// const baseUrl = `${CORS_ANYWARE}https://superheroapi.com/api/${TOKEN_API}/search/`;
const baseUrl = `https://superheroapi.com/api/${TOKEN_API}/search/`;

function App() {
  const authCtx = React.useContext(AuthContext);
  const tokenInLocalStorage = authCtx.tokenInLocalStorage;

  console.log("context", authCtx);
  const [heroeSearchTxt, setHeroeSearchTxt] = React.useState();
  const [heroes, setHeroes] = React.useState();
  const [teamMembers, setTeamMembers] = React.useState([]);
  const [teamStats, setTeamStats] = React.useState({});
  const history = useHistory();

  function removeHeroHandler(heroId) {
    return setTeamMembers();
  }

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
  // Managing heroes
  function addHeroesHandler(hero) {
    // function addGoodHeroes() {}

    if (teamMembers.length === 6) {
      alert("Maximo 6 heroes");
      return;
    }
    // Test if the hero already exist
    else if (teamMembers.some((h) => h.id === hero.id)) {
      alert("El Hero ya existe");
      return;
    }
    return setTeamMembers((prev) => [...prev, hero]);
  }

  // Show details of the hero on a especific page
  function detailsHeroTeamHenadler() {
    // TODO this shows de hero deatils page
  }

  // Remove Hero
  function removeHeroTeamHandler(heroId) {
    setTeamMembers(teamMembers.filter((hero) => hero.id !== heroId));
  }

  // This works find heroes based on his name
  function findHeroesHandler(inputName) {
    axios
      .get(`${baseUrl}${inputName}`)
      .then((res) => {
        let data = res.data.results;
        setHeroes(data);
      })

      .catch((error) => console.log(error.response));
  }

  return (
    <div className="container">
      <Navbar />
      <Switch>
        <Route path="/" exact>
          {!tokenInLocalStorage && history.replace("/logIn")}
          <SearchHeroes onFindHeroes={findHeroesHandler} />

          <Home heroes={heroes} onAddHeroToTeam={addHeroesHandler} />
        </Route>

        <Route path="/logIn">
          <div className="d-flex justify-content-center align-items-center form-box">
            <LogIn />
          </div>
        </Route>

        <Route path="/heroes">
          {tokenInLocalStorage && (
            <Heroes
              teamStats={teamStats}
              teamMembers={teamMembers}
              onRemoveHeroTeam={removeHeroTeamHandler}
              onDetailsHeroTeam={detailsHeroTeamHenadler}
            />
          )}
        </Route>
        <Route path="/hero-details/:heroId">
          {tokenInLocalStorage && <HeroDetails />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
