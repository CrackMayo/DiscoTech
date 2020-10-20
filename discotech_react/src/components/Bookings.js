import React, { Component } from "react";
import ReservationItem from "../components/ReservationItem";
import fire from "../fire";
import "firebase/firestore";

class Bookings extends Component {
  state = {
    ListBookings: [],
  };

  componentDidMount() {
    this.getDiscos();
  }

  async getDiscos() {
    let list = [];
    const response = await fire
      .firestore()
      .collection("accounts")
      .doc("tamayo998@hotmail.com")
      .collection("reservas")
      .get();
    response.forEach((document) => {
      let detalles = document.data().detallesResrva;
      let nombreDisco = document.data().discoName;
      let fecha = document.data().fechaReserva;
      let nombreUsuario = document.data().user;
      let idUsuario = document.data().userId;
      let celUsuario = document.data().userPhone;
      let obj = { detalles, nombreDisco, fecha, nombreUsuario, idUsuario, celUsuario};
      list.push(obj);
    });
    this.setState({ ListBookings: list });
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          {this.state.ListBookings.map((reserva) => {
            return (
              <ReservationItem
                detalles={reserva.detalles}
                nombreDisco={reserva.nombreDisco}
                fecha={reserva.fecha}
                nombreUsuario= {reserva.nombreUsuario}
                idUsuario = {reserva.idUsuario}
                celUsuario = {reserva.celUsuario}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
export default Bookings;