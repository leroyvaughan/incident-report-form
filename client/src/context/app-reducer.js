
const AppReducer = (state, action) => {
  switch (action.type) {
    case "ADD_FORM_DATA":
      let key = action.payload[0];
      let val = action.payload[1];
      state[key] = val;

      return {
        ...state
      };

    case 'EDIT_REPORT':
      state = action.payload;

      return {
        ...state
      }


    default:
      return state;
  }
}

export default AppReducer