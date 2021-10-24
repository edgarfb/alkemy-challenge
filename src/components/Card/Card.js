import React from "react";
import BtnAddHero from "../UI/BtnAddHero";
import { Link } from "react-router-dom";
import HeroesContext from "../../context/heroes-context";

function Card(props) {
  const heroesCtx = React.useContext(HeroesContext);
  return (
    <div className="card mb-2">
      <img className="card-img-top" src={props.src} alt={props.name} />
      <div className="card-body">
        <h5 className="card-title fs-6 text-center">{props.name}</h5>
      </div>
      <div className="d-grid gap-2">
        {props.removeBtn && (
          <BtnAddHero
            className="btn btn-danger"
            content="Eliminar"
            onClick={() => {
              heroesCtx.saveHeroIdHandler(props.id);
              heroesCtx.showModal("remove");
            }}
          />
        )}
        {props.addBtn && (
          <BtnAddHero
            className="btn btn-success"
            content="Agregar al equipo"
            onClick={() => heroesCtx.addHeroesHandler(props.hero)}
          />
        )}
        {props.detailsBtn && (
          <Link className="btn btn-primary" to={`/hero-details/${props.id}`}>
            Detalles
          </Link>
        )}
      </div>
    </div>
  );
}

export default Card;
