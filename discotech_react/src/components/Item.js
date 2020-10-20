import React from "react";

function Item(props) {
  const handleShowDisco = (e) => {
    props.setScreen(2);
    props.setDisco(e);
  };
  return (
    <div className="col-md-3 text-center">
      <div className="card">
        <img className="card-img-top" src={props.discoImg} alt="Card" />
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">
            <b>Musical Genre: </b>
            {props.discoType}
          </p>
          <a className="btn btn-primary" href="#" onClick={() => handleShowDisco(props.name)}>
            More Details
          </a>
        </div>
      </div>
    </div>
  );
}

export default Item;
