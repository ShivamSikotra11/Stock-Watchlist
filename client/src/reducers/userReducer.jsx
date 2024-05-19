const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_TOAST":
      return {
        ...state,
        toastActive: true,
        toastData: action.payload,
      };
    case "SET_USER":
      // console.log(action.payload);
      return {
        ...state,
        loggedIn: true,
        curUser: action.payload,
      };
    case "UNSET_USER":
      return {
        ...state,
        loggedIn: false,
        curUser: {},
      };
    case "ALTER_CREDENTIALS_FETCHING":
      // console.log(action.payload);
      return {
        ...state,
        isCredentialsFetching: !state.isCredentialsFetching,
      };
    case "ALTER_CREDENTIALS_ERROR":
      const { flag, message } = action.payload;
      return {
        ...state,
        isCredentialError: [flag,message],
      };
    default:
      return state;
  }
};

export default userReducer;
