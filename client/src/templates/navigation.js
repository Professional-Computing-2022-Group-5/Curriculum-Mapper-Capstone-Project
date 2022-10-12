import React, { useState, useEffect } from "react";

import httpClient from "./httpClient.js";
import logo from "./images/uwa.png";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { IconContext } from "react-icons";
import { IoLogInSharp } from "react-icons/io5";
import { BsPersonCircle } from "react-icons/bs";

import * as yup from "yup";
import { useFormik } from "formik";

const Navigation = () => {
  const [userType, setUserType] = useState("BasicUser");
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const [showLogin, setLoginShow] = useState(false);
  const [showRegister, setRegisterShow] = useState(false);

  const handleLoginClose = () => {
    setLoginShow(false);
    setRegisterShow(false);
  };
  const handleLoginShow = () => {
    setLoginShow(true);
    setRegisterShow(false);
  };

  const handleRegisterClose = () => {
    setLoginShow(false);
    setRegisterShow(false);
  };
  const handleRegisterShow = () => {
    setLoginShow(false);
    setRegisterShow(true);
  };

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get("//localhost:5000/@me");
        //    setUser(resp.data);

        if (resp.data.isCoordinator === true) {
          setUserType("UnitCoordinator");
        }

        if (resp.data.loggedIn === true) {
          setUserLoggedIn(true);
        }

        if (resp.data.loggedIn === true) {
          setUserName(resp.data.email);
        }
      } catch (error) {
        console.log("No Current User Logged In");
      }
    })();
  }, []);

  const logoutUser = async () => {
    await httpClient.post("//localhost:5000/logout");
    window.location.href = "/home";
  };

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
        console.log(resp.data);

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
          <Form>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={6} lg={{ span: 4, offset: 1 }}>
                Email Address:{" "}
              </Form.Label>

              <Col sm={6} lg={{ span: 5, offset: 1 }}>
                <Form.Control
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlID="formBasicPassword">
              <Form.Label column sm={6} lg={{ span: 4, offset: 1 }}>
                Password:{" "}
              </Form.Label>

              <Col sm={6} lg={{ span: 5, offset: 1 }}>
                <Form.Control
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Row>
              <Button variant="uwa" onClick={() => logInUser()}>
                Login
              </Button>
              <Button variant="uwa" onClick={handleRegisterShow}>
                Register
              </Button>
            </Row>
          </Form>
        </Row>
      </Container>
    );
  };

  function Register() {
    const formik = useFormik({
      initialValues: {
        username: "",
        email: "",
        isCoordinator: false,
        password: "",
        passwordConfirmation: "",
      },
      validationSchema: yup.object({
        username: yup.string().required("User Name is required"),
        email: yup
          .string()
          .email("Invalid email")
          .required("Required"),
        isCoordinator: yup.boolean().notRequired(),
        password: yup
          .string()
          .required("Password is required")
          .min(8, "Password must contain 8 or more characters")
          .matches(/^(?=.*[A-Z])/, "Must contain one uppercase letter")
          .matches(/^(?=.*[0-9])/, "Must contain one number")
          .matches(/^(?=.*[!@#$%^&*])/, "Must contain one special character"),
        passwordConfirmation: yup
          .string()
          .oneOf([yup.ref("password"), null], "Passwords must match"),
      }),
      onSubmit: function(values) {
        const registerUser = async () => {
          console.log("OOOOOO");
          console.log(values.email);
          console.log(values.password);
          console.log(values.isCoordinator);

          const resp = await httpClient.post("//localhost:5000/register", {
            username: values.username,
            email: values.email,
            password: values.password,
            isCoordinator: Boolean(values.isCoordinator),
          });
          console.log("frpm the backedn");
          console.log(resp.data);

          try {
            const resp = await httpClient.post("//localhost:5000/login", {
              email: values.email,
              password: values.password,
            });
            console.log(resp.data);

            window.location.href = "/home";
          } catch (error) {
            if (error.response.status === 401) {
              alert("Invalid credentials");
            }
          }
        };

        registerUser();
      },
    });

    return (
      <div>
        <Container className="register">
          <form onSubmit={formik.handleSubmit}>
            <Row>
              <Col sm={6} lg={{ span: 4, offset: 1 }}>
                <label>User Name:</label>
              </Col>
              <Col sm={6} lg={{ span: 5, offset: 1 }}>
                <input
                  id="username"
                  name="username"
                  placeholder="User name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                />
              </Col>
            </Row>
            <Row>
              {formik.errors.username && formik.touched.username ? (
                <div className="error_message">{formik.errors.username}</div>
              ) : null}
            </Row>
            <Row>
              <Col sm={6} lg={{ span: 4, offset: 1 }}>
                <label>Email:</label>
              </Col>
              <Col sm={6} lg={{ span: 5, offset: 1 }}>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email Address"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
              </Col>
            </Row>
            <Row>
              {formik.errors.email && formik.touched.email ? (
                <div className="error_message">{formik.errors.email}</div>
              ) : null}
            </Row>
            <Row>
              <Col sm={6} lg={{ span: 4, offset: 1 }}>
                <label>Password:</label>
              </Col>
              <Col sm={6} lg={{ span: 5, offset: 1 }}>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
              </Col>
            </Row>
            <Row>
              {formik.errors.password && formik.touched.password ? (
                <div className="error_message">{formik.errors.password}</div>
              ) : null}
            </Row>
            <Row>
              <Col sm={6} lg={{ span: 4, offset: 1 }}>
                <label>Confirm Password:</label>
              </Col>
              <Col sm={6} lg={{ span: 5, offset: 1 }}>
                <input
                  type="password"
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  placeholder="Confirm Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.passwordConfirmation}
                />
              </Col>
            </Row>
            <Row>
              {formik.errors.passwordConfirmation &&
              formik.touched.passwordConfirmation ? (
                <div className="error_message">
                  {formik.errors.passwordConfirmation}
                </div>
              ) : null}
            </Row>
            <Row>
              <Col sm={2} lg={{ span: 1, offset: 3 }}></Col>
              <Col sm={2} lg={{ span: 1, offset: 3 }}>
                <input
                  id="isCoordinator"
                  name="isCoordinator"
                  type="radio"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.isCoordinator}
                />
              </Col>
              <Col sm={8} lg={{ span: 8, offset: 1 }}>
                <label>Unit Coordinator?</label>
              </Col>
            </Row>
            <Row>
              <Button variant="uwa" type="submit">
                Submit
              </Button>
            </Row>
          </form>
        </Container>
      </div>
    );
  }

  return (
    <div>
      <Navbar sticky="top" className="uwa-nav" variant="dark">
        <Container>
          <Navbar.Brand href="/home">
            <img src={logo} alt="UWA Logo" width="50" height="50" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav variant="pills">
              <Nav.Item>
                <Nav.Link href="/home">Home</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/query">Query</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                {userType === "UnitCoordinator" ? (
                  <Nav.Link href="/reportGen">Report Generation</Nav.Link>
                ) : null}
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
          {userLoggedIn === false ? (
            <div className="d-flex flex-row-reverse">
              <Button variant="uwa-circle" onClick={handleLoginShow}>
                <IconContext.Provider
                  value={{ color: "#27348b", size: "30px" }}
                >
                  <IoLogInSharp />
                </IconContext.Provider>{" "}
              </Button>
            </div>
          ) : (
            <div className="d-flex flex-row-reverse">
              <div className="p-2">
                <h4>Welcome {userName}!</h4>
              </div>

              <Button variant="uwa-circle" onClick={logoutUser}>
                <IconContext.Provider
                  value={{ color: "#27348b", size: "30px" }}
                >
                  <BsPersonCircle />
                </IconContext.Provider>{" "}
              </Button>
            </div>
          )}
        </Container>
      </Navbar>

      <Modal
        show={showLogin}
        onHide={handleLoginClose}
        animation={true}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton centered>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login />
        </Modal.Body>
      </Modal>

      <Modal
        show={showRegister}
        onHide={handleRegisterClose}
        animation={true}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton centered>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Register />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Navigation;
