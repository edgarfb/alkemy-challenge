import React from "react";

function SearchHeroes(props) {
  const inputRef = React.useRef();
  return (
    <div className="input-group mb-3">
      <span className="input-group-text" id="basic-addon1">
        Buscar Heroe
      </span>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          console.log("hi");
          props.onFindHeroes(inputRef.current.value);
        }}
      >
        <input className="form-control" type="text" ref={inputRef} />
      </form>
    </div>
  );
}

export default SearchHeroes;
