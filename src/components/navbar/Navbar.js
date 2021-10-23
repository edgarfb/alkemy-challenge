import React from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth-context";

function Navbar(props) {
  const authCtx = React.useContext(AuthContext);
  const tokenInLocalStorage = authCtx.tokenInLocalStorage;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex flex-nowrap">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          Inicio
        </Link>

        <div className="d-flex navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto  mb-lg-0">
            <li className="nav-item">
              <Link
                to="/heroes"
                className="nav-link active"
                aria-current="page"
              >
                Mi equipo
              </Link>
            </li>
          </ul>
          {tokenInLocalStorage && (
            <button onClick={authCtx.logOutHandler} className="btn btn-success">
              Salir
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
