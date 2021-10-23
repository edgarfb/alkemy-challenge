import React from "react";
import HeroesContext from "../../context/heroes-context";

function SearchHeroes(props) {
  const inputRef = React.useRef();
  const heroesCtx = React.useContext(HeroesContext);
  return (
    <div className="input-group mb-3">
      <span className="input-group-text" id="basic-addon1">
        Buscar Heroe
      </span>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          heroesCtx.findHeroesHandler(inputRef.current.value);
        }}
      >
        <input className="form-control" type="text" ref={inputRef} autoFocus />
      </form>
    </div>
  );
}

export default SearchHeroes;
