import httpClient from "./httpClient.js";
import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Register () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isCoordinator, setIsCoordinator] = useState(false);
    
    const registerUser = async () => {
        console.log(email, password, isCoordinator);
    
        const resp = await httpClient.post("//localhost:5000/register", {email, password, isCoordinator});
        console.log("frpm the backedn");
        console.log(resp.data);

    };


    return (
    <Container className="register">
        <Row>
            <h1>Register</h1>
        </Row>

        <Row>
            <Form>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={3} lg={3}>Email Address: </Form.Label>
                        <Col sm={9} lg={6}>
                        <Form.Control placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                        </Col>
                    </Form.Group>
                    
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={3} lg={3}>Password: </Form.Label>
                        <Col sm={9} lg={6}>
                        <Form.Control placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                        </Col>
                    </Form.Group>
                    
                    <Form.Group as={Row} className="mb-3">
                        <Col sm={3} lg={3}>
                        </Col>
                        <Col>
                        <Form.Check type={"radio"} label = {"Unit Coordinator?"} checked={isCoordinator} onChange={() => setIsCoordinator(!isCoordinator)}/>
                        </Col>
                    </Form.Group>
                <Row>
                <Col sm={3} lg={3}>
                </Col>
                <Col>
                <Button variant="primary" onClick={() => registerUser()}>Submit</Button>
                </Col>
                </Row>
            </Form>
        </Row>

    </Container>
    );
}

export default Register;