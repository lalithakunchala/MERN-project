import {FETCH_USER_REGISTER_FAILURE,FETCH_USER_REGISTER_REQUEST,FETCH_USER_REGISTER_SUCCESS,
    FETCH_USER_LOGIN_FAILURE,FETCH_USER_LOGIN_REQUEST,FETCH_USER_LOGIN_SUCCESS,
    FETCH_USER_FAILURE,FETCH_USER_REQUEST,FETCH_USER_SUCCESS,LOGOUT} from './actionTypes'
  
  const initStore = {
    isLoading: false,
    data: [],
    error: "",
    regError:"",
    regSuccess:"",
    logError:"",
    logSuccess:"",
    logUser:"",
    userSuccess:"",
    userError:"",
    token : ""
  };
  
  const reducer = (state = initStore, {type,payload}) => {
    console.log("reducer called");
    switch (type) {
      
        case FETCH_USER_REGISTER_REQUEST:
        console.log("reducer register request called");
        return {
          ...state,
          isLoading: true,
          
        };
        case FETCH_USER_REGISTER_SUCCESS:
        console.log("reducer register SUCCESS called");
        return {
          ...state,
          regSuccess:payload,
          isLoading: false
        };
        case FETCH_USER_REGISTER_FAILURE:
        console.log("reducer register  failure request called");
        return {
          ...state,
          isLoading: false,
          regError: payload
        };

        case FETCH_USER_LOGIN_REQUEST:
        console.log("reducer login request called", payload);
        return {
          ...state,
          isLoading: true
          
        };
        case FETCH_USER_LOGIN_SUCCESS:
        console.log("reducer login request called");
        return {
          ...state,
          logSuccess:payload,
          logUser:payload.name,
          token:payload.token,
          isLoading: false
        };

        case FETCH_USER_LOGIN_FAILURE:
        console.log("reducer login  failure request called");
        return {
          ...state,
          isLoading: false,
          logError: payload
        };
        case FETCH_USER_REQUEST:
        console.log("reducer login request called");
        return {
          ...state,
          isLoading: true
          
        };
        case FETCH_USER_SUCCESS:
        console.log("reducer login request called");
        return {
          ...state,
          userSuccess:payload,
          isLoading: false
        };
        case FETCH_USER_FAILURE:
        console.log("reducer login  failure request called");
        return {
          ...state,
          isLoading: false,
          userError: payload
        };

        case LOGOUT:
          console.log("logout");
          return{
            ...state,
            logSuccess:"",
            logUser:"",
            token:""
          }

      default:
        console.log("reducer default called");
        return state;
    }
  };
  
  export default reducer;