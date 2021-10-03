import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useHistory } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/auth-context";
import "./LogIn.css";

// MAIN
function LogIn(props) {
  // const [isAuthorized, setIsAuthorized] = React.useState(true);
  const [isSubmited, setIsSubmited] = React.useState(false);
  const isLogIn = React.useContext(AuthContext);
  const history = useHistory();
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = "Este campo es necesario.";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Formato no válido";
        }
        if (!values.password) {
          errors.password = "Este campo es necesario.";
        } else if (values.password.length < 5) {
          errors.password = "La contraseña debe de al menos 5 caracteres.";
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
            props.onLogin(true);
            history.replace("/");
          })
          .catch((error) => {
            if (error.response.status !== 200) {
              props.onLogin(false);
            }
            setTimeout(() => {
              props.onLogin(true);
            }, 2000);
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
              <h3 className="text-center">Iniciar seción</h3>
            </div>
            <div className="mb-3">
              <label htmlFor="email">Correo</label>
              <Field
                className="form-control"
                type="email"
                name="email"
                placeholder="correo@alkemy.com"
              ></Field>
            </div>
            <ErrorMessage
              name="email"
              component={() => <div className="rojo">{errors.email}</div>}
            />
            <div className="mb-3">
              <label htmlFor="password">Contraseña</label>
              <Field
                className="form-control"
                type="password"
                name="password"
                placeholder=""
              ></Field>
            </div>
            <ErrorMessage
              name="password"
              component={() => <div className="rojo">{errors.password}</div>}
            />
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary">
                Enviar
              </button>
            </div>
            {!props.onLogin && (
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
