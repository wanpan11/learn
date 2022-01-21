const initialState = {
  data: 1,
  type: 'store',
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD':
      return { data: state.data + 1 };

    default:
      return state;
  }
}

export default rootReducer;
