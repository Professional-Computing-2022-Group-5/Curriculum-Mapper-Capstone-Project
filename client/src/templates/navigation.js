import React, { useState, useEffect } from "react";

import httpClient from "./httpClient.js";
import logo from "./images/uwa.png"

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Navigation = () => {

  const [userType, setUserType] = useState("BasicUser");

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get("//localhost:5000/@me");

        if (resp.data.isCoordinator === true) {
          setUserType("UnitCoordinator")
        }
      } catch (error) {
        console.log("No Current User Logged In");
      }
    })();
  }, []);


  return (
    <div>
      <Navbar bg="dark" variant="dark" sticky="top">

        <Container>
          <Navbar.Brand href="/home">
            <img
              src={logo}
              alt=""
              width="50"
              height="50"
            /></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">

            <Nav variant="pills" >
              <Nav.Item>
                <Nav.Link href="/home">Home</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/query">Query</Nav.Link>
              </Nav.Item>
              {userType === "UnitCoordinator" ? (
                <Nav.Item>
                  <Nav.Link hrf="/reportGen">Report Generation</Nav.Link>
                </Nav.Item>) : (<div></div>)}
              <Nav.Item>
                <Nav.Link href="/login">Log In</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/register">Register</Nav.Link>
              </Nav.Item>


            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navigation;
