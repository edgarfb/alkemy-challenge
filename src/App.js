import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";

import LogIn from "./components/LogIn/LogIn";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import Heroes from "./pages/Heroes";
import SearchHeroes from "./components/SearchHeroes.js/SearchHeroes";
import HeroDetails from "./pages/HeroDetails";
import AuthContext from "./context/auth-context";
import Modal from "./components/UI/Modal";
import HeroesContext from "./context/heroes-context";

function App() {
  const authCtx = React.useContext(AuthContext);
  const heroesCtx = React.useContext(HeroesContext);
  const tokenInLocalStorage = authCtx.tokenInLocalStorage;

  return (
    <div className="container">
      {authCtx.displayModal && (
        <Modal success>El hero fue agregado con exito!</Modal>
      )}
      <Navbar />
      <Switch>
        {tokenInLocalStorage && (
          <Route path="/" exact>
            <SearchHeroes />

            <Home heroes={heroesCtx.heroes} />
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
              teamStats={heroesCtx.teamStats}
              teamMembers={heroesCtx.teamMembers}
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
