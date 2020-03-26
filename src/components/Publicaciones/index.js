import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../General/Spinner";
import Fatal from "../General/Fatal";
import * as usuariosActions from "../../actions/usuariosActions";
import * as publicacionesActions from "../../actions/publicacionesActions";

const { traerTodos: usuariosTraerTodos } = usuariosActions;
const { traerPorUsuario: publicacionesTraerPorUsuario } = publicacionesActions;
class Publicaciones extends Component {
  async componentDidMount() {
    const {
      usuariosTraerTodos,
      match: {
        params: { key }
      },
      publicacionesTraerPorUsuario
    } = this.props;

    if (!this.props.usuariosReducer.usuarios.length) {
      // this.props.traerTodos();
      // this.props.publicacionesActions.traerTodos();
      // await this.props.usuariosTraerTodos();
      await usuariosTraerTodos();
    }
    if (this.props.usuariosReducer.error) {
      return;
    }
    if (!("publicaciones_key" in this.props.usuariosReducer.usuarios[key])) {
      await publicacionesTraerPorUsuario(key);
    }
    // await this.props.publicacionesTraerPorUsuario(this.props.match.params.key);
    // console.log(this.props.publicacionesReducer.publicaciones);
  }

  ponerNombre = () => {
    const {
      match: {
        params: { key }
      },
      usuariosReducer
    } = this.props;

    if (usuariosReducer.error) {
      return <Fatal mensaje={usuariosReducer.error} />;
    }
    if (!usuariosReducer.usuarios.length || usuariosReducer.cargando) {
      return <Spinner />;
    }

    const nombre = usuariosReducer.usuarios[key].name;

    return <h1>Publicaciones de {nombre}</h1>;
  };

  render() {
    console.log(this.props);
    return (
      <div>
        {this.ponerNombre()}
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
  publicacionesTraerPorUsuario
};
/*
const mapDispatchToProps = {
  ...usuariosActions,
  ...publicacionesActions
};
*/

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);
