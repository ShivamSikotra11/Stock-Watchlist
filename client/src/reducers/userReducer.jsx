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
        loggedIn:true,
        curUser: action.payload,
      }
    case "UNSET_USER":
      return {
        ...state,
        loggedIn:false,
        curUser: {},
      }
    default:
      return state;
  }
};

export default userReducer;
