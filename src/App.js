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

const TOKEN_API = "1621075358241982";
const CORS_ANYWARE = "https://cors.bridged.cc/";
const baseUrl = `${CORS_ANYWARE}https://superheroapi.com/api/${TOKEN_API}/search/`;

function App() {
  const [heroeSearchTxt, setHeroeSearchTxt] = React.useState();
  const [heroes, setHeroes] = React.useState();
  const [teamMembers, setTeamMembers] = React.useState([]);
  // const [goodHeroes, setGoodHeroes] = React.useState([]);
  // const [badHeroes, setBadHeroes] = React.useState([]);
  const [teamStats, setTeamStats] = React.useState({});
  const history = useHistory();

  // try out context
  const isLog = React.useContext(AuthContext);

  function removeHeroHandler(heroId) {
    let newTeamMembers;
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

  // This is the text input for search the heroes
  function changeHandler(heroToFind) {
    setHeroeSearchTxt(heroToFind);
  }

  // This works find heroes based on his name
  React.useEffect(() => {
    let regEx = new RegExp(`${heroeSearchTxt}`, "gi");
    axios
      .get(`${baseUrl}${heroeSearchTxt}`)
      .then((res) => {
        if (res.data.response === "error") {
          console.error(res.data.error);
        }
        let all = res.data.results;
        let filtered = res.data.results.filter((he) => he.name.match(regEx));

        setHeroes(filtered);
      })

      .catch((error) => console.log(error.response));
  }, [heroeSearchTxt]);

  // Remove the user Token to logOut
  function logOutHandler() {
    localStorage.removeItem("userToken");
    setUserToken("");
  }

  // Check is the token exist on LocalStorege
  function checkToken() {
    let token = localStorage.hasOwnProperty("userToken");

    return token ? localStorage.getItem("userToken") : "";
  }
  const [userToken, setUserToken] = React.useState(checkToken());

  const userTokenHandler = (token) => {
    setUserToken(token);
  };

  return (
    <AuthContext.Provider
      value={{
        isLogIn: userToken,
      }}
    >
      <div className="container">
        <Navbar onLogOut={logOutHandler} />
        <Switch>
          {!userToken && history.replace("/logIn")}
          <Route path="/" exact>
            {" "}
            <SearchHeroes onChangeHandler={changeHandler} />
            {userToken && (
              <Home heroes={heroes} onAddHeroToTeam={addHeroesHandler} />
            )}
          </Route>

          <Route path="/logIn" exact>
            <div className="d-flex justify-content-center align-items-center form-box">
              <LogIn onUserToken={userTokenHandler} />
            </div>
          </Route>

          <Route path="/heroes">
            {/* {!userToken && history.replace("/logIn")} */}
            {userToken && (
              <Heroes
                teamStats={teamStats}
                teamMembers={teamMembers}
                onRemoveHeroTeam={removeHeroTeamHandler}
                onDetailsHeroTeam={detailsHeroTeamHenadler}
              />
            )}
          </Route>
          <Route path="/hero-details/:heroId">
            {userToken && <HeroDetails />}
          </Route>
        </Switch>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
