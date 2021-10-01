import React from "react";

function Card(props) {
  return (
    <div className="card">
      <img className="card-img-top" src={props.src} alt={props.name} />
      <div className="card-body">
        <h5 className="card-title fs-6 text-center">{props.name}</h5>
      </div>
    </div>
  );
}

export default Card;
