import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import axios from "axios";
import LogIn from "./components/LogIn/LogIn";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import Heroes from "./pages/Heroes";
import SearchHeroes from "./components/SearchHeroes.js/SearchHeroes";

const TOKEN_API = "1621075358241982";
const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJjaGFsbGVuZ2VAYWxrZW15Lm9yZyIsImlhdCI6MTUxNjIzOTAyMn0.ilhFPrG0y7olRHifbjvcMOlH7q2YwlegT0f4aSbryBE";
const baseUrl = "https://superheroapi.com/api/1621075358241982/search/";

function App() {
  const [heroeSearchTxt, setHeroeSearchTxt] = React.useState();
  const [heroes, setHeroes] = React.useState();

  function changeHandler(txt) {
    console.log(txt);
    setHeroeSearchTxt(txt);
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
  function logOutHandler() {
    localStorage.removeItem("userToken");
    setUserToken("");
  }
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
    <div className="container">
      <Navbar onLogOut={logOutHandler} />
      <SearchHeroes onChangeHandler={changeHandler} />

      <Switch>
        {/* <div className="d-flex justify-content-center align-items-center form-box">
          {!userToken && <LogIn onUserToken={userTokenHandler} />}
        </div> */}
        <Route path="/" exact>
          {" "}
          {heroeSearchTxt && <Home heroes={heroes} />}
        </Route>
        <Route path="/heroes">
          <Heroes />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
