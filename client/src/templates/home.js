import React, { useState, useEffect } from "react";
import httpClient from "./httpClient";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const Home = () => {

  const logoutUser = async () => {
    await httpClient.post("//localhost:5000/logout");
    window.location.href = "/home";
  };

  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState("BasicUser");

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get("//localhost:5000/@me");
        setUser(resp.data);

        if(resp.data.isCoordinator === true){
          setUserType("UnitCoordinator")
        }
      } catch (error) {
        console.log("No Current User Logged In");
      }
    })();
  }, []);


  return ( 
  <Container>
    <Row>
    <h1>Welcome to your curriculum mapper</h1>
    </Row>
      {user != null ? (
        // LOGGED IN
        
        <Container>
        <Row>
          <h2>Logged in</h2>
          <h3>Id: {user.id}</h3>
          <h3>Email Address: {user.email}</h3>
          <h3>UnitCoordinator {userType}</h3>
        </Row>

        <Row>
          <Button onClick={logoutUser}>Logout</Button>
        </Row>
        </Container>


      ) : (

        // NOT LOGGED IN
        <Container>
          <Row>
          <p>You are not logged in</p>
          </Row>
          <Row>
            <Col sm={2} md={2} lg={2}>            
            <a href="/login">
              <Button>Login</Button>
            </a>
            </Col>
            <Col sm={2} md={2} lg={2}>
            <a href="/register">
              <Button>Register</Button>
            </a>
            </Col>
          </Row>
        </Container>
      )}


    </Container>
   );
}
 
export default Home;
