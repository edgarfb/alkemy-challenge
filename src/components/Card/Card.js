import React from "react";

function Card(props) {
  return (
    <div className="card col-md-3">
      <img src={props.src} alt={props.name} />
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
      </div>
    </div>
  );
}

export default Card;
