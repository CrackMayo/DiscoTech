import React from "react";

function ReservationItem(props) {

  return (
    <div className="col-md-3 text-center">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{props.nombreDisco}</h5>
          <p className="card-text">
            <b>Fecha: </b>
            {props.fecha}
          </p>
          <p className="card-text">
            <b>Datails: </b>
            {props.detalles}
          </p>
          <p className="card-text">
            <b>User: </b>
            {props.nombreUsuario}
          </p>
          <p className="card-text">
            <b>User ID: </b>
            {props.idUsuario}
          </p>
          <p className="card-text">
            <b>User Contact Info: </b>
            {props.celUsuario}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ReservationItem;
