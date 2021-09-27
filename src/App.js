import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import LogIn from "./components/LogIn/LogIn";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import Heroes from "./pages/Heroes";

const token = "1621075358241982";
const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJjaGFsbGVuZ2VAYWxrZW15Lm9yZyIsImlhdCI6MTUxNjIzOTAyMn0.ilhFPrG0y7olRHifbjvcMOlH7q2YwlegT0f4aSbryBE";
const baseUrl = `https://superheroapi.com/api/1621075358241982/search/batman`;

function App() {
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
      <Switch>
        {/* <div className="d-flex justify-content-center align-items-center form-box">
          {!userToken && <LogIn onUserToken={userTokenHandler} />}
        </div> */}
        <Route path="/" exact>
          {" "}
          <Home />
        </Route>
        <Route path="/heroes">
          <Heroes />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
