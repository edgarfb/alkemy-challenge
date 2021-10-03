import React from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../context/auth-context";

function Navbar(props) {
  const context = React.useContext(AuthContext);
  // console.log("Context in Navbar", context);

  const isLog = React.useContext(AuthContext);
  const history = useHistory();

  console.log("context from navbar", isLog);
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
          {isLog.isLogIn && (
            <button onClick={props.onLogOut} className="btn btn-success">
              Log out
            </button>
          )}
          {!isLog && history.replace("/logIn")}
          {/* <button onClick={props.onLogOut} className="btn btn-success">
            Log out
          </button> */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
