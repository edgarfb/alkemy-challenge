import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import "./LogIn.css";

// MAIN
function LogIn(props) {
  const [isAuthorized, setIsAuthorized] = React.useState(true);
  const [isSubmited, setIsSubmited] = React.useState(false);
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = "This fild has to be filled";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email format";
        }
        if (!values.password) {
          errors.password = "This fild has to be filled";
        } else if (values.password.length < 5) {
          errors.password =
            "The password need to be grater than 8 characters long";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        resetForm();
        let baseURL = `http://challenge-react.alkemy.org/`;
        axios
          .post(baseURL, {
            email: values.email,
            password: values.password,
          })
          .then((res) => {
            let store = localStorage.setItem("userToken", res.data.token);
            props.onUserToken(localStorage.getItem("userToken"));
            setIsSubmited(true);
          })
          .catch((error) => {
            console.log(error.response);
            if (error.response.status !== 200) {
              setIsAuthorized(false);
            }
            setTimeout(() => setIsAuthorized(true), 2000);
          });
        setTimeout(() => {
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ values, errors }) => {
        return (
          <Form className="form-control formBox">
            <div>
              <h3 className="text-center">Log in</h3>
            </div>
            <div className="mb-3">
              <label htmlFor="email">Email</label>
              <Field
                className="form-control"
                type="email"
                name="email"
                placeholder="Email"
              ></Field>
            </div>
            <ErrorMessage
              name="email"
              component={() => <div className="rojo">{errors.email}</div>}
            />
            <div className="mb-3">
              <label htmlFor="password">Password</label>
              <Field
                className="form-control"
                type="password"
                name="password"
                placeholder="password"
              ></Field>
            </div>
            <ErrorMessage
              name="password"
              component={() => <div className="rojo">{errors.password}</div>}
            />
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            {!isAuthorized && (
              <div className="alert alert-warning" role="alert">
                Unauthorized - Please provide valid email and password
              </div>
            )}
            {isSubmited && (
              <div className="alert alert-success" role="alert">
                The form have been submitted!
              </div>
            )}
          </Form>
        );
      }}
    </Formik>
  );
}

export default LogIn;
