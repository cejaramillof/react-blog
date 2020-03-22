const INITIAL_STATE = {
	usuarios: [1,2,3]
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'traer_usuarios':
			return { ...state, usuarios: action.payload };

		default: return state;
	};
};