import React from "react";
import { NavLink } from "react-router-dom";
import logo from "./images/uwa.png"
import burgerFunction from "./index.js";

function Navigation() {
  return (
    <div className="navigation">
      <nav className="navbar stick-top navbar-expand-md">
        <div className="container-fluid">
        <button
            class="navbar-toggler"
            type="button"
            onclick="burgerFunction(this)"
            onClick={(event) => {
              if (event.classList.contains("change")) {
                  event.classList.remove("change");
              } else {
                  event.classList.add("change");
              }
              }
            }
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <b class="menu-btn__burger"></b>
          </button>
          <NavLink className="navbar-brand" to="/">
          <a href="">
            <img
              src={logo}
              alt=""
              width="50"
              height="50"
            />
          </a>
          </NavLink>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                  <span className="sr-only">(current)</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/query">
                  query
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/report_gen">
                  report gen
                </NavLink>
              </li>
             
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;