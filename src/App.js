import React from "react";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import "./App.css";
import axios from "axios";
import LogIn from "./components/LogIn/LogIn";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import Heroes from "./pages/Heroes";
import SearchHeroes from "./components/SearchHeroes.js/SearchHeroes";
import HeroDetails from "./pages/HeroDetails";
import AuthContext from "./context/auth-context";
import Modal from "./components/UI/Modal";

const TOKEN_API = process.env.REACT_APP_TOKEN_API;
const CORS_ANYWARE = process.env.REACT_APP_CORS_ANYWARE;
// const baseUrl = `${CORS_ANYWARE}https://superheroapi.com/api/${TOKEN_API}/search/`;
// just for developmen
const baseUrl = `https://superheroapi.com/api/${TOKEN_API}/search/`;

function App() {
  const authCtx = React.useContext(AuthContext);
  const tokenInLocalStorage = authCtx.tokenInLocalStorage;

  const [heroes, setHeroes] = React.useState();
  const [teamMembers, setTeamMembers] = React.useState([]);
  const [teamStats, setTeamStats] = React.useState({});

  function removeHeroHandler(heroId) {
    return setTeamMembers();
  }

  console.log("team members", teamMembers);

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

    // This woks too :)
    authCtx.showModal();
    return setTeamMembers((prev) => {
      return [...prev, hero];
    });
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
      {authCtx.displayModal && (
        <Modal success>El hero fue agregado con exito!</Modal>
      )}
      <Navbar />
      <Switch>
        {tokenInLocalStorage && (
          <Route path="/" exact>
            <SearchHeroes onFindHeroes={findHeroesHandler} />

            <Home heroes={heroes} onAddHeroToTeam={addHeroesHandler} />
          </Route>
        )}

        {!tokenInLocalStorage && (
          <Route path="/logIn">
            <div className="d-flex justify-content-center align-items-center form-box">
              <LogIn />
            </div>
          </Route>
        )}

        {tokenInLocalStorage && (
          <Route path="/heroes">
            <Heroes
              teamStats={teamStats}
              teamMembers={teamMembers}
              onRemoveHeroTeam={removeHeroTeamHandler}
              onDetailsHeroTeam={detailsHeroTeamHenadler}
            />
          </Route>
        )}
        {tokenInLocalStorage && (
          <Route path="/hero-details/:heroId">
            <HeroDetails />
          </Route>
        )}

        <Route path="*">
          <Redirect to="/logIn"></Redirect>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
