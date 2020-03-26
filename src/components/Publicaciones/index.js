import React, { Component } from "react";
import { connect } from "react-redux";
import * as usuariosActions from "../../actions/usuariosActions";
import * as publicacionesActions from "../../actions/publicacionesActions";

const { traerTodos: usuariosTraerTodos } = usuariosActions;
const { traerTodos: publicacionesTraerTodos } = publicacionesActions;

class Publicaciones extends Component {
  componentDidMount() {
    if (!this.props.usuariosReducer.usuarios.length) {
      // this.props.traerTodos();
      // this.props.publicacionesActions.traerTodos();
      this.props.usuariosTraerTodos();
    }
  }

  render() {
    return (
      <div>
        <h1>Publicaciones de</h1>
        {this.props.match.params.key}
      </div>
    );
  }
}

const mapStateToProps = ({ usuariosReducer, publicacionesReducer }) => {
  return { usuariosReducer, publicacionesReducer };
};

const mapDispatchToProps = {
  usuariosTraerTodos,
  publicacionesTraerTodos
};
/*
const mapDispatchToProps = {
  ...usuariosActions,
  ...publicacionesActions
};
*/

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);
