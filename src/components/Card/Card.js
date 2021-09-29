import React from "react";

function Card(props) {
  return (
    <div className="card">
      <img src={props.src} alt={props.name} />
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
        <h6>Power Stats</h6>
        <div>Combat: {props.powerstats.combat}</div>
        <div>Durability: {props.powerstats.durability}</div>
        <div>Intelligence: {props.powerstats.intelligence}</div>
        <div>Power: {props.powerstats.power}</div>
        <div>Speed: {props.powerstats.speed}</div>
        <div>Strength: {props.powerstats.strength}</div>
      </div>
    </div>
  );
}

export default Card;
