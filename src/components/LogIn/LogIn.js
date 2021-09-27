import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import "./LogIn.css";

function LogIn() {
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
        } else if (values.password.length < 8) {
          errors.password =
            "The password need to be grater than 8 characters long";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        resetForm();
        setTimeout(() => {
          console.log(values);
          setSubmitting(false);
        }, 400);
      }}
    >
      {/* */}

      {({
        values,
        errors,
        touched,
        handleSubmit,
        isSubmitting,
        isValidating,
      }) => {
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
          </Form>
        );
      }}
    </Formik>
  );
}

export default LogIn;
