import React from "react";

function BtnAddHero(props) {
  return (
    <button className={props.className} type="button" onClick={props.onClick}>
      {props.content}
    </button>
  );
}

export default BtnAddHero;

// Para enviar CV
// sumate@enviopack.com
