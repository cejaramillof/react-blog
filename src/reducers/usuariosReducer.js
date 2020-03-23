import { TRAER_TODOS } from "../types/usuariosTypes";

const INITIAL_STATE = {
  usuarios: [1, 2, 23]
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TRAER_TODOS:
      return { ...state, usuarios: action.payload };

    default:
      return state;
  }
};
