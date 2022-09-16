import React from "react";
import { NavLink } from "react-router-dom";
import logo from "./images/uwa.png"


function Navigation() {
  return (
    <div className="navigation">
      <nav className="navbar stick-top navbar-expand-md">
        <div className="container-fluid">
        <button
            class="navbar-toggler"
            type="button"
            onclick="burgerFunction(this)"
            
            //onClick={(event) => {
            //  if (event.classList.contains("change")) {
            //      event.classList.remove("change");
            //  } else {
            //      event.classList.add("change");
            //  }
            //  }
            //}
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <b class="menu-btn__burger"></b>
          </button>
          <NavLink className="navbar-brand" to="/home">
            <img
              src={logo}
              alt=""
              width="50"
              height="50"
            />
          </NavLink>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/home">
                  Home Page
                  <span className="sr-only">(current)</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/query">
                  Query page
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/reportGen">
                  Report Generation Page
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Login Page
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/register">
                  Register Page
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