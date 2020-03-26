import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../General/Spinner";
import Fatal from "../General/Fatal";
import * as usuariosActions from "../../actions/usuariosActions";
import * as publicacionesActions from "../../actions/publicacionesActions";
import Comentarios from "./Comentarios";

const { traerTodos: usuariosTraerTodos } = usuariosActions;
const {
  traerPorUsuario: publicacionesTraerPorUsuario,
  abrirCerrar,
  traerComentarios
} = publicacionesActions;

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
    // usuariosReducer don't be destructurated in componentDidMount because is a state and this be updated
    // destructuration create a const with the value and when he go for usuariosTraerTodos dont will be updated.
    if (!("publicaciones_key" in this.props.usuariosReducer.usuarios[key])) {
      await publicacionesTraerPorUsuario(key);
    }
    // await this.props.publicacionesTraerPorUsuario(this.props.match.params.key);
    // console.log(this.props.publicacionesReducer.publicaciones);
  }

  ponerUsuario = () => {
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

  ponerPublicaciones = () => {
    const {
      usuariosReducer,
      usuariosReducer: { usuarios },
      publicacionesReducer,
      publicacionesReducer: { publicaciones },
      match: {
        params: { key }
      }
    } = this.props;

    if (!usuarios.length) return;
    if (usuariosReducer.error) return;
    if (publicacionesReducer.cargando) {
      return <Spinner />;
    }
    if (publicacionesReducer.error) {
      return <Fatal mensaje={publicacionesReducer.error} />;
    }
    if (!publicaciones.length) return;
    if (!("publicaciones_key" in usuarios[key])) return;

    const { publicaciones_key } = usuarios[key];
    return this.mostrarInfo(
      publicaciones[publicaciones_key],
      publicaciones_key
    );
  };

  mostrarInfo = (publicaciones, pub_key) =>
    publicaciones.map(({ id, title, body, abierto, comentarios }, com_key) => (
      <div
        key={id}
        className="pub_titulo"
        onClick={() => this.mostrarComentarios(pub_key, com_key, comentarios)}
      >
        <h2>{title}</h2>
        <h3>{body}</h3>
        {abierto ? "abierto" : "cerrado"}
        {/* data by reducer be more presence than by params in component */}
        {abierto ? <Comentarios comentarios={comentarios} /> : ""}
      </div>
    ));

  mostrarComentarios = (pub_key, com_key, comentarios) => {
    this.props.abrirCerrar(pub_key, com_key);
    if (!comentarios.length) {
      this.props.traerComentarios(pub_key, com_key);
    }
  };

  render() {
    console.log(this.props);
    return (
      <div>
        {this.ponerUsuario()}
        {this.ponerPublicaciones()}
      </div>
    );
  }
}

const mapStateToProps = ({ usuariosReducer, publicacionesReducer }) => {
  return { usuariosReducer, publicacionesReducer };
};

const mapDispatchToProps = {
  usuariosTraerTodos,
  publicacionesTraerPorUsuario,
  abrirCerrar,
  traerComentarios
};
/*
const mapDispatchToProps = {
  ...usuariosActions,
  ...publicacionesActions
};
*/

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);
