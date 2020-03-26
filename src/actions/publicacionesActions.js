import axios from "axios";
import {
  ACTUALIZAR,
  TRAER_POR_USUARIO,
  TRAER_TODOS,
  CARGANDO,
  ERROR
} from "../types/publicacionesTypes";
import * as usuariosTypes from "../types/usuariosTypes";

const { TRAER_TODOS: USUARIOS_TRAER_TODOS } = usuariosTypes;

export const traerTodos = () => async dispatch => {
  dispatch({
    type: CARGANDO
  });

  try {
    const respuesta = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    dispatch({
      type: TRAER_TODOS,
      payload: respuesta.data
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: ERROR,
      payload: "Algo salió mal, intente más tarde."
    });
  }
};

export const traerPorUsuario = key => async (dispatch, getState) => {
  dispatch({
    type: CARGANDO
  });

  const { usuarios } = getState().usuariosReducer;
  const { publicaciones } = getState().publicacionesReducer;
  const usuario_id = usuarios[key].id;

  try {
    const respuesta = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?userId=${usuario_id}`
    );
    const nuevas = respuesta.data.map(publicacion => ({
      ...publicacion,
      comentarios: [],
      abierto: false
    }));
    const publicaciones_actualizadas = [...publicaciones, nuevas];

    dispatch({
      type: ACTUALIZAR,
      payload: publicaciones_actualizadas
    });

    const publicaciones_key = publicaciones_actualizadas.length - 1;
    // usuarios[key]["publicaciones_key"] = publicaciones_key;
    const usuarios_actualizados = [...usuarios];
    usuarios_actualizados[key] = {
      ...usuarios[key],
      publicaciones_key
    };

    dispatch({
      type: USUARIOS_TRAER_TODOS,
      payload: usuarios_actualizados
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: ERROR,
      payload: "Publicaciones no disponibles."
    });
  }
};

export const abrirCerrar = (pub_key, com_key) => (dispatch, getState) => {
  console.log(pub_key, com_key);
  const { publicaciones } = getState().publicacionesReducer;
  const seleccionada = publicaciones[pub_key][com_key];

  const actualizada = {
    ...seleccionada,
    abierto: !seleccionada.abierto
  };
  publicaciones[pub_key][com_key] = actualizada;

  dispatch({
    type: ACTUALIZAR,
    payload: publicaciones
  });
};
