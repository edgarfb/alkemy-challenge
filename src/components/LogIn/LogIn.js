import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./LogIn.css";
import AuthContext from "../../context/auth-context";

// MAIN
function LogIn(props) {
  const [isSubmited, setIsSubmited] = React.useState(false);
  const [isSending, setIsSending] = React.useState(false);
  const history = useHistory();
  const authCtx = React.useContext(AuthContext);
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
        setIsSending(true);
        let baseURL = process.env.REACT_APP_BASE_URL;
        axios
          .post(baseURL, {
            email: values.email,
            password: values.password,
          })
          .then((res) => {
            localStorage.setItem("userToken", res.data.token);
            authCtx.setInStorageHandler(localStorage.getItem("userToken"));
            setIsSubmited(true);
            setIsSending(false);
            history.replace("/");
          })
          .catch((error) => {
            console.log(error);
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
            {!isSubmited && (
              <div className="alert alert-warning" role="alert">
                Unauthorized - Please provide valid email and password
              </div>
            )}
            {isSubmited && (
              <div className="alert alert-success" role="alert">
                The form have been submitted!
              </div>
            )}
            {isSending && (
              <div className="d-flex justify-content-center">
                <button className="btn btn-primary" type="button" disabled>
                  <span
                    className="spinner-grow spinner-grow-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Loading...
                </button>
              </div>
            )}
          </Form>
        );
      }}
    </Formik>
  );
}

export default LogIn;
