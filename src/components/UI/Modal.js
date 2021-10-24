import React from "react";
import ReactDom from "react-dom";
import styles from "./Modal.module.css";
import times from "../../images/times-solid.svg";
import HeroesContext from "../../context/heroes-context";
import { useHistory } from "react-router-dom";

function Backdrop(props) {
  return <div className={styles.backdrop}>{props.children}</div>;
}

function Button(props) {
  return (
    <button
      type="button"
      // props.action just to style the btn
      className={`ms-3 btn btn-${props.action}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

function Modal(props) {
  const history = useHistory();
  const heroesCtx = React.useContext(HeroesContext);
  let title = heroesCtx.typeModal === "success" ? "Felicidades!" : "Mensaje";
  let message = "";
  switch (heroesCtx.typeModal) {
    case "success":
      message = "El hero fue agregado con exito!";
      break;
    case "remove":
      message = "Eliminar personaje?";
      break;
    case "exist":
      message = "El personaje ya esta en el equipo";
      break;
    case "noMore":
      message = "El equipo sólo puede tener 6 personajes.";
      break;

    default:
      break;
  }
  return (
    <React.Fragment>
      {ReactDom.createPortal(
        <Backdrop>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <header className="d-flex justify-content-between p-3">
              <h5 className={styles.title}>{title}</h5>
              <div
                className={styles.btnClose}
                onClick={(e) => {
                  e.stopPropagation();
                  heroesCtx.hideModal();
                }}
              >
                <img src={times} alt="" />
              </div>
            </header>
            <hr />
            <div className={styles.description}>
              <p>{message}</p>
            </div>
            <hr />
            <div className="d-flex justify-content-end p-3">
              {heroesCtx.typeModal === "success" && (
                <Button
                  action="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    heroesCtx.hideModal();
                    history.replace("/heroes");
                  }}
                >
                  Ver equipo
                </Button>
              )}
              {heroesCtx.typeModal === "remove" && (
                <Button
                  action="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    heroesCtx.saveHeroIdHandler(null);
                    heroesCtx.hideModal();
                  }}
                >
                  Cancelar
                </Button>
              )}
              <Button
                action="success"
                onClick={(e) => {
                  e.stopPropagation();
                  heroesCtx.removeHeroTeamHandler(heroesCtx.saveHeroId);
                  heroesCtx.saveHeroIdHandler(null);
                  heroesCtx.hideModal();
                }}
              >
                Entendido
              </Button>
            </div>
          </div>
        </Backdrop>,
        document.getElementById("modal")
      )}
    </React.Fragment>
  );
}

export default Modal;
