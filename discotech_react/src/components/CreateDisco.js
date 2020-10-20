import React from "react";
import fire from "../fire";
import "firebase/firestore";
import { useState, useEffect } from "react";
import swal from "sweetalert";
const CreateDisco = () => {
  const [discoName, setDiscoName] = useState("");
  const [discoDetails, setDiscoDetails] = useState("");
  const [discoType, setDiscoType] = useState("");
  const [discoSchedule, setDiscoSchedule] = useState("");
  const [discoAddress, setDiscoAddress] = useState("");

  const clearInputs = () => {
    setDiscoName("");
    setDiscoDetails("");
    setDiscoType("");
    setDiscoAddress("");
    setDiscoSchedule("");
  };

  const handleCreateDisco = () => {
    fire
      .firestore()
      .collection("accounts")
      .doc("tamayo998@hotmail.com")
      .collection("discotecas").doc(discoName).set({
        nombreDiscoteca: discoName,
        descripcionDetallada: discoDetails,
        horarioDeOperacion: discoSchedule,
        imagenDiscoteca: "https://firebasestorage.googleapis.com/v0/b/discotech.appspot.com/o/test2.jpg?alt=media&token=50c6968e-ce65-409e-a001-0d7f2d8e9f54",
        tipo: discoType,
        ubicacion: discoAddress
      })
      clearInputs();
      swal("A new disco has been created!", "", "success");
  };

  return (
    <section className="createDisco">
      <div className="createDiscoContainer">
        <h1 className="discoTechTitle">New Disco</h1>
        <label>Name:</label>
        <input
          type="text"
          autoFocus
          required
          value={discoName}
          onChange={(e) => setDiscoName(e.target.value)}
        />
        <label>Description:</label>
        <input
          type="text"
          required
          value={discoDetails}
          onChange={(e) => setDiscoDetails(e.target.value)}
        />
        <label>Musical Genre:</label>
        <select
          value={discoType}
          onChange={(e) => setDiscoType(e.target.value)}
        >
          <option value="" defaultValue disabled>
            Select an option
          </option>
          <option value="Urbano">Urbano</option>
          <option value="Popular">Popular</option>
          <option value="Rock">Rock</option>
          <option value="Salsa">Salsa</option>
          <option value="Electronica">Electrónica</option>
          <option value="Tropical">Tropical</option>
          <option value="Vallenato">Vallenato</option>
        </select>
        <label>Address:</label>
        <input
          type="text"
          required
          value={discoAddress}
          onChange={(e) => setDiscoAddress(e.target.value)}
        />
        <label>Schedule:</label>
        <input
          type="text"
          required
          value={discoSchedule}
          onChange={(e) => setDiscoSchedule(e.target.value)}
        />
        <div className="btnContainer">
          <>
            <button onClick={handleCreateDisco}>Create</button>
          </>
        </div>
      </div>
    </section>
  );
};

export default CreateDisco;
