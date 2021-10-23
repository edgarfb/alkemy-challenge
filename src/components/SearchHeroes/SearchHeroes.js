import React from "react";
import HeroesContext from "../../context/heroes-context";

function SearchHeroes(props) {
  const inputRef = React.useRef();
  const heroesCtx = React.useContext(HeroesContext);
  return (
    <div className="input-group mb-3">
      <form
        onSubmit={(e) => {
          e.preventDefault();

          heroesCtx.findHeroesHandler(inputRef.current.value);
        }}
      >
        <div className="d-flex">
          <button className="btn btn-default" type="submit">
            Buscar
          </button>
          <input
            className="form-control"
            type="text"
            ref={inputRef}
            autoFocus
          />
        </div>
      </form>
    </div>
  );
}

export default SearchHeroes;
