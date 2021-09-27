import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar(props) {
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
          <button onClick={props.onLogOut} className="btn btn-success">
            Log out
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
