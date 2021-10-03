import React from "react";
import styles from "./SearchHeroes.module.css";

function SearchHeroes(props) {
  return (
    <div className="input-group mb-3">
      <span className="input-group-text" id="basic-addon1">
        Buscar Heroe
      </span>
      <input
        className="form-control"
        type="text"
        onChange={(e) => {
          e.preventDefault();
          props.onChangeHandler(e.target.value);
        }}
      />
    </div>
  );
}

export default SearchHeroes;
