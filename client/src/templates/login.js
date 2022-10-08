import httpClient from "./httpClient.js";
import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const logInUser = async () => {
      console.log(email, password);

      try {
          const resp = await httpClient.post("//localhost:5000/login", {
            email,
            password,
          });
          console.log(resp.data)
                    
          window.location.href = "/home";
    
        } catch (error) {
          if (error.response.status === 401) {
            alert("Invalid credentials");
          }
        }
      };

  return ( 
  <Container>
  <Row>
    <h1>Log In</h1>
  </Row>
  <Row>
    <Form>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={3} lg={2}>Email Address: </Form.Label>
        
        <Col sm={9} lg={6}>
          <Form.Control placeholder = "Email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
        </Col>
      
      </Form.Group>
      
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={3} lg={2}>Password: </Form.Label>
        
        <Col sm={9} lg={6}>
          <Form.Control placeholder = "Password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
        </Col>
      
      </Form.Group>

      <Row>

      <Col sm={3} lg={2}>
      </Col>

      <Col>
      <Button variant="uwa" onClick={() => logInUser()}>Submit</Button>
      </Col>

      </Row>

    </Form>
  </Row>
  </Container>

  );
}

export default Login;

