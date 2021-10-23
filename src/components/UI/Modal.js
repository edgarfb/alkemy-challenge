import React from "react";
import ReactDom from "react-dom";
import styles from "./Modal.module.css";
import times from "../../images/times-solid.svg";
import AuthContext from "../../context/auth-context";

function Backdrop(props) {
  return <div className={styles.backdrop}>{props.children}</div>;
}

function Modal(props) {
  const authCtx = React.useContext(AuthContext);
  let title = props.success ? "Felicitaciones" : "default";
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
                  authCtx.hideModal();
                  console.log("btn clicked");
                }}
              >
                <img src={times} alt="" />
              </div>
            </header>
            <hr />
            <div className={styles.description}>
              <p>{props.children}</p>
            </div>
            <hr />
            <div className="d-flex justify-content-end p-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  authCtx.hideModal();
                }}
                type="button"
                className="btn btn-success"
              >
                Entendido
              </button>
            </div>
          </div>
        </Backdrop>,
        document.getElementById("modal")
      )}
    </React.Fragment>
  );
}

export default Modal;
