import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import axios from "axios";
import LogIn from "./components/LogIn/LogIn";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import Heroes from "./pages/Heroes";
import SearchHeroes from "./components/SearchHeroes.js/SearchHeroes";
import HeroDetails from "./pages/HeroDetails";

const TOKEN_API = "1621075358241982";
const CORS_ANYWARE = "https://cors.bridged.cc/";
const baseUrl = `${CORS_ANYWARE}https://superheroapi.com/api/${TOKEN_API}/search/`;

function App() {
  const [heroeSearchTxt, setHeroeSearchTxt] = React.useState();
  const [heroes, setHeroes] = React.useState();
  const [teamMembers, setTeamMembers] = React.useState([]);
  const [goodHeroes, setGoodHeroes] = React.useState([]);
  const [badHeroes, setBadHeroes] = React.useState([]);

  function removeHeroHandler(heroId) {
    let newTeamMembers;
    return setTeamMembers();
  }

  // Managing heroes
  function addHeroesHandler(hero) {
    // function addGoodHeroes() {}
    console.log(hero);
    if (teamMembers.length === 6) {
      console.log("No es posible agregar mas heroes");
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
        console.log(filtered);
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
    console.log("Token", token);
  };

  return (
    <React.Fragment>
      <Navbar onLogOut={logOutHandler} />
      <div className="container">
        <Switch>
          {/* <div className="d-flex justify-content-center align-items-center form-box">
          {!userToken && <LogIn onUserToken={userTokenHandler} />}
        </div> */}
          <Route path="/" exact>
            {" "}
            <SearchHeroes onChangeHandler={changeHandler} />
            {heroeSearchTxt && (
              <Home heroes={heroes} onAddHeroToTeam={addHeroesHandler} />
            )}
          </Route>
          <Route path="/heroes">
            <Heroes
              teamMembers={teamMembers}
              onRemoveHeroTeam={removeHeroTeamHandler}
              onDetailsHeroTeam={detailsHeroTeamHenadler}
            />
          </Route>
          <Route path="/hero-details/:heroId">
            <HeroDetails />
          </Route>
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default App;
