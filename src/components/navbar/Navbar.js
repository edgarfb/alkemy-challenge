import React from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../context/auth-context";

function Navbar(props) {
  const authCtx = React.useContext(AuthContext);
  const tokenInLocalStorage = authCtx.tokenInLocalStorage;

  const history = useHistory();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex flex-nowrap">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          Home
        </Link>

        <div className="d-flex navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto  mb-lg-0">
            <li className="nav-item">
              <Link
                to="/heroes"
                className="nav-link active"
                aria-current="page"
              >
                Heroes
              </Link>
            </li>
          </ul>
          {tokenInLocalStorage && (
            <button onClick={authCtx.logOutHandler} className="btn btn-success">
              Log out
            </button>
          )}

          {/* <button onClick={props.onLogOut} className="btn btn-success">
            Log out
          </button> */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
