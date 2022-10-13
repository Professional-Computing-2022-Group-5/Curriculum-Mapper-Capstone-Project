import httpClient from "./httpClient.js";
import React, { useState } from "react";
//import Button from "react-bootstrap/Button";
//import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
//import Col from "react-bootstrap/Col";
//import { Formik, Field, Form } from 'formik';
import { Formik, Form, Field } from "formik";
import Form.Group from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//const { Formik } = formik;
import * as yup from "yup";

const registrationSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup
    .string()
    .email("Invalid email")
    .required("Required"),
  password: yup.string().required("Password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

function Register() {
  return (
    <Container className="register">
      <Row>
        <h1>Register</h1>
      </Row>

      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          passwordConfirmation: "",
        }}
        validationSchema={registrationSchema}
        onSubmit={(values) => {
          // same shape as initial values
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Row className="mb-3">
              <Field name="firstName" />
              {errors.firstName && touched.firstName ? (
                <div>{errors.firstName}</div>
              ) : null}
            </Row>

            <Row className="mb-3">
              <Field name="lastName" />
              {errors.lastName && touched.lastName ? (
                <div>{errors.lastName}</div>
              ) : null}
            </Row>

            <Row className="mb-3">
              <Field name="email" type="email" />
              {errors.email && touched.email ? <div>{errors.email}</div> : null}
            </Row>

            <Row className="mb-3">
              <Field name="password" type="password" />
              {errors.password && touched.password ? (
                <div>{errors.password}</div>
              ) : null}
            <Row>
            
            <Row className="mb-3">
              <Field name="passwordConfirmation" type="password" />
              {errors.passwordConfirmation && touched.passwordConfirmation ? (
                <div>{errors.passwordConfirmation}</div>
              ) : null}
            </Row>

            <Row className="mb-3">
              <button type="submit">Submit</button>
            </Row>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default Register;
