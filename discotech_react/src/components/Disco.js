import React from "react";
import fire from "../fire";
import "firebase/firestore";
import { useState, useEffect } from "react";
import swal from "sweetalert";
const Disco = (props) => {
  const [discoName, setDiscoName] = useState("");
  const [discoDetails, setDiscoDetails] = useState("");
  const [discoType, setDiscoType] = useState("");
  const [discoSchedule, setDiscoSchedule] = useState("");
  const [discoAddress, setDiscoAddress] = useState("");
  const [discoImg, setDiscoImg] = useState("");
  const [discoBook, setDiscoBook] = useState("");
  const [bookDetails, setBookDetails] = useState("");
  const [bookDate, setBookDate] = useState("");
  const [userName, setUserName] = useState("");
  const [userID, setUserID] = useState("");
  const [userPhone, setUserPhone] = useState("");


  const clearInputs = () => {
    setBookDetails("");
    setBookDate("");
  };

  const loadDiscoData = () => {
    // or get the single doc from the collection
    fire
      .firestore()
      .collection("accounts")
      .doc("tamayo998@hotmail.com")
      .collection("discotecas")
      .doc(props.disco)
      .get()
      .then((doc) => {
        const data = doc.data();
        setDiscoName(data.nombreDiscoteca);
        setDiscoDetails(data.descripcionDetallada);
        setDiscoType(data.tipo);
        setDiscoAddress(data.ubicacion);
        setDiscoSchedule(data.horarioDeOperacion);
        setDiscoImg(data.imagenDiscoteca);
      });
  };

  const loadUser = () => {
    fire
    .firestore()
    .collection("accounts")
    .doc("tamayo998@hotmail.com")
    .get()
    .then((doc) => {
      const data = doc.data();
      setUserName(data.nombre);
      setUserID(data.cedula);
      setUserPhone(data.celular);
    });
  }
  loadUser();
  const handleDiscoBook = () => {
    // or get the single doc from the collection
    fire
      .firestore()
      .collection("accounts")
      .doc("tamayo998@hotmail.com")
      .collection("reservas")
      .doc()
      .set({
        user: userName,
        userId: userID,
        userPhone: userPhone,
        detallesResrva: bookDetails,
        fechaReserva: bookDate,
        discoName: discoName
      });
    clearInputs();
    swal("A new reservation has been created!", "", "success");
  };

  loadDiscoData();

  return (
    <section className="createDisco">
      <div className="createDiscoContainer">
        <h1 className="discoTechTitle">Disco</h1>
        <div className="card">
          <img
            className="card-img-top imgDiscoShow"
            src={discoImg}
            alt="Card"
          />
        </div>
        <label>Name:</label>
        <input
          type="text"
          autoFocus
          required
          disabled
          value={discoName}
          onChange={(e) => setDiscoName(e.target.value)}
        />
        <label>Description:</label>
        <textarea
          type="text"
          required
          disabled
          value={discoDetails}
          onChange={(e) => setDiscoDetails(e.target.value)}
        />
        <label>Musical Genre:</label>
        <select
          value={discoType}
          disabled
          onChange={(e) => setDiscoType(e.target.value)}
        >
          <option value="" defaultValue disabled>
            {discoType}
          </option>
        </select>
        <label>Address:</label>
        <input
          type="text"
          required
          disabled
          value={discoAddress}
          onChange={(e) => setDiscoAddress(e.target.value)}
        />
        <label>Schedule:</label>
        <input
          type="text"
          required
          disabled
          value={discoSchedule}
          onChange={(e) => setDiscoSchedule(e.target.value)}
        />
        <label>Booking Details:</label>
        <textarea
          type="text"
          autoFocus
          required
          value={bookDetails}
          onChange={(e) => setBookDetails(e.target.value)}
        />
        <label>Date and Hour:</label>
        <input
          type="datetime-local"
          value={bookDate}
          min="2020-06-07T00:00"
          max="2021-06-14T00:00"
          onChange={(e) => setBookDate(e.target.value)}
        ></input>
        <div className="btnContainer">
          <>
            <button className="bookBtn" onClick={handleDiscoBook}>
              Book
            </button>
            <button>Update</button>
            <button className="deleteBtn">Delete</button>
          </>
        </div>
      </div>
    </section>
  );
};

export default Disco;
