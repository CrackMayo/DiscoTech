import React, { Component } from "react";
import Item from "../components/Item";
import fire from "../fire";
import "firebase/firestore";

class List extends Component {
  state = {
    ListDiscos: [],
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
      .collection("discotecas")
      .get();
    response.forEach((document) => {
      let id = document.id;
      let type = document.data().tipo;
      let img = document.data().imagenDiscoteca;
      let details = document.data().descripcionDetallada;
      let obj = { id, type, img, details };
      list.push(obj);
    });
    this.setState({ ListDiscos: list });
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          {this.state.ListDiscos.map((disco) => {
            return (
              <Item
                key={disco.id}
                name={disco.id}
                discoImg={disco.img}
                discoType={disco.type}
                screen = {this.props.screen}
                setScreen = {this.props.setScreen}
                disco = {this.props.disco}
                setDisco = {this.props.setDisco}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
export default List;
