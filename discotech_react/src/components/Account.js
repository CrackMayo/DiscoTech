import React from "react";
import fire from "../fire";
import "firebase/firestore";
import { useState, useEffect } from "react";

const Account = () => {
  const [userName, setUserName] = useState("");
  const [userID, setUserID] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userRol, setUserRol] = useState("");

  const clearInputs = () => {
    setUserName("");
    setUserPhone("");
    setUserID("");
    setUserRol("");
  };

  const loadAccountData = () => {
    // or get the single doc from the collection
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
        setUserRol(data.rol);
      });
  };

  loadAccountData();

  return (
    <section className="createDisco">
      <div className="createDiscoContainer">
        <h1 className="discoTechTitle">User Info</h1>
        <div className="">
          <img
            className="userImg"
            src = "https://firebasestorage.googleapis.com/v0/b/discotech.appspot.com/o/user.jpg?alt=media&token=6295855f-d825-44f1-8e4a-bf6da88f3e66"
            alt="Card"
          />
        </div>
        <label>Name:</label>
        <input
          type="text"
          autoFocus
          required
          disabled
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <label>ID:</label>
        <textarea
          type="text"
          required
          disabled
          value={userID}
          onChange={(e) => setUserID(e.target.value)}
        />
        <label>Phone:</label>
        <select
          value={userPhone}
          disabled
          onChange={(e) => setUserPhone(e.target.value)}
        >
          <option value="" defaultValue disabled>
            {userPhone}
          </option>
        </select>
        <label>Rol:</label>
        <input
          type="text"
          required
          disabled
          value={userRol}
          onChange={(e) => setUserRol(e.target.value)}
        />
        <div className="btnContainer">
          <>
            <button>Update</button>
            <button className="deleteBtn">Add Payment Method</button>
          </>
        </div>
      </div>
    </section>
  );
};

export default Account;
