import React, { Component } from "react";
import { connect } from "react-redux";
import * as usuariosActions from "../../actions/usuariosActions";
import Spinner from "../General/Spinner";
import Fatal from "../General/Fatal";
import Tabla from "./Tabla";

class Usuarios extends Component {
  /*
  constructor() {
    super();

    this.state = {
      usuarios: []
    };
  }
  */

  // async componentDidMount() {
  // async componentDidMount() {
  /*
		const respuesta = await axios.get(
		"https://jsonplaceholder.typicode.com/users"
		);
		this.setState({
		usuarios: respuesta.data
		});
	*/
  // call Action Creator (this have the promise) to share with Reducer
  //  this.props.traerTodos();
  //}

  componentDidMount() {
    if (!this.props.usuarios.length) {
      this.props.traerTodos();
    }
  }

  ponerContenido = () => {
    if (this.props.cargando) {
      return <Spinner />;
    }

    if (this.props.error) {
      return <Fatal mensaje={this.props.error} />;
    }
    return <Tabla />;
    // return <Tabla usuarios={this.props.usuarios} />;
  };

  render() {
    // console.log(this.props.cargando);
    // console.log(this.props.error);
    // console.log(this.props);
    return (
      <div>
        <h1>Usuarios</h1>
        {this.ponerContenido()}
      </div>
    );
  }
}

const mapStateToProps = reducers => {
  return reducers.usuariosReducer;
};

// Connect(__AllReducersProviderWillShareWithThisComponent__,__Actions__)
export default connect(mapStateToProps, usuariosActions)(Usuarios);
