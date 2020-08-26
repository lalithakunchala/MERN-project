import {FETCH_ADMIN_REGISTER_FAILURE,
    FETCH_ADMIN_REGISTER_REQUEST,
    FETCH_ADMIN_REGISTER_SUCCESS,
    FETCH_ADMIN_LOGIN_FAILURE,
    FETCH_ADMIN_LOGIN_REQUEST,
    FETCH_ADMIN_LOGIN_SUCCESS,
    FETCH_ADMIN_FAILURE,
    FETCH_ADMIN_REQUEST,
    FETCH_ADMIN_SUCCESS,LOGOUT} from './actionTypes'

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
        userError:""
      };
      
      const reducer = (state = initStore, {type,payload}) => {
        console.log("reducer called");
        switch (type) {
          
            case FETCH_ADMIN_REGISTER_REQUEST:
            console.log("reducer register request called");
            return {
              ...state,
              isLoading: true,
              
            };
            case FETCH_ADMIN_REGISTER_SUCCESS:
            console.log("reducer register SUCCESS called");
            return {
              ...state,
              regSuccess:payload,
              isLoading: false
            };
            case FETCH_ADMIN_REGISTER_FAILURE:
            console.log("reducer register  failure request called");
            return {
              ...state,
              isLoading: false,
              regError: payload
            };
    
            case FETCH_ADMIN_LOGIN_REQUEST:
            console.log("reducer login request called", payload);
            return {
              ...state,
              isLoading: true
              
            };
            case FETCH_ADMIN_LOGIN_SUCCESS:
            console.log("reducer login request called");
            return {
              ...state,
              logSuccess:payload,
              logUser:payload.name,
              isLoading: false
            };
    
            case FETCH_ADMIN_LOGIN_FAILURE:
            console.log("reducer login  failure request called");
            return {
              ...state,
              isLoading: false,
              logError: payload
            };
            case FETCH_ADMIN_REQUEST:
            console.log("reducer login request called");
            return {
              ...state,
              isLoading: true
              
            };
            case FETCH_ADMIN_SUCCESS:
            console.log("reducer login request called");
            return {
              ...state,
              userSuccess:payload,
              isLoading: false
            };
            case FETCH_ADMIN_FAILURE:
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
                logUser:""
              }
    
          default:
            console.log("reducer default called");
            return state;
        }
      };
      
      export default reducer;