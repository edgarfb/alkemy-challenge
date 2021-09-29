import React from "react";
import styles from "./SearchHeroes.module.css";

function SearchHeroes(props) {
  return (
    <form>
      <input
        type="text"
        onChange={(e) => {
          e.preventDefault();
          props.onChangeHandler(e.target.value);
        }}
      />
    </form>
  );
}

export default SearchHeroes;
