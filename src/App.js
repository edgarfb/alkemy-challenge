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
  const [heroes, setHeroes] = React.useState();
  console.log("heroes", heroes);
  function changeHandler(txt) {
    setHeroes(txt);
  }
  // Just for develop the card and maped the info I get
  React.useEffect(() => {
    axios
      .get(`${baseUrl}ironman`)
      .then((res) => {
        console.log(res.data.results);
        let maped = res.data.results.map((e) => {
          return {
            name: e.name,
            imgUrl: e.image.url,
          };
        });
        setHeroes(maped);
      })
      .catch((error) => console.log(error.response));
  }, []);

  // This works find heroes based on his name
  // React.useEffect(() => {
  //   axios
  //     .get(`${baseUrl}${heroes}`)
  //     .then((res) => console.log(res.data.results))
  //     .catch((error) => console.log(error.response));
  // }, [heroes]);
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
      <h1>{heroes[0].name}</h1>
      <img src={heroes[0].imgUrl} alt="iron man" />
      <Switch>
        {/* <div className="d-flex justify-content-center align-items-center form-box">
          {!userToken && <LogIn onUserToken={userTokenHandler} />}
        </div> */}
        {/* <Route path="/" exact>
          {" "}
          <Home />
        </Route>
        <Route path="/heroes">
          <Heroes />
        </Route> */}
      </Switch>
    </div>
  );
}

export default App;
