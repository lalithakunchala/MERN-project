import axios from "axios";
import {FETCH_USER_REGISTER_FAILURE,FETCH_USER_REGISTER_REQUEST,FETCH_USER_REGISTER_SUCCESS,
  FETCH_USER_LOGIN_FAILURE,FETCH_USER_LOGIN_REQUEST,FETCH_USER_LOGIN_SUCCESS,
  FETCH_USER_FAILURE,FETCH_USER_REQUEST,FETCH_USER_SUCCESS,LOGOUT} from './actionTypes'

const logout = ()=>{
  return {
    type: LOGOUT
  }
}

const fetchUserRegisterRequest = () => {
  console.log("fetch user register request action called");
  
  return {
    type: FETCH_USER_REGISTER_REQUEST,
    
  };
};

const fetchUserRegisterSuccess = (res) => {
  console.log("fetch user register success action called");
  return {
    type: FETCH_USER_REGISTER_SUCCESS,
    payload :res
  };
};

const fetchUserRegisterFailure = error => {
  console.log("fetch user register failure action called");
  return {
    type: FETCH_USER_REGISTER_FAILURE,
    payload:error
    
    // error: error
  };
};


const fetchUserRegister = (data) => {
  console.log("fetch register Data called", data);
  return dispatch => {
      dispatch(fetchUserRegisterRequest())
      return  axios.post(
          "http://localhost:8000/user/register",
            {
            "name": `${data.name}`,
            "email": `${data.email}`,
            "password": `${data.password}`,
        }).then(res=>{
          console.log("response register success", res.data);
          return dispatch(fetchUserRegisterSuccess(res.data));
        })
        .catch(error => fetchUserRegisterFailure(error))
  }
}

const fetchUserLoginRequest = () => {
  console.log("fetch user login request action called");
  
  return {
    type: FETCH_USER_LOGIN_REQUEST
  };
};

const fetchUserLoginSuccess = (res) => {
  console.log("fetch user login success action called");
  return {
    type: FETCH_USER_LOGIN_SUCCESS,
    payload: res,
    
  };
};

const fetchUserLoginFailure = error => {
  console.log("fetch user login failure action called");
  return {
    type: FETCH_USER_LOGIN_FAILURE,
    payload:error
    
  };
};


 const fetchUserLogin = (userdetails) => {
  console.log("fetch user login data action called",userdetails);
  return dispatch => {
      dispatch(fetchUserLoginRequest())
      return  axios.post(
          "http://localhost:8000/user/login",
            {
            
            "password": `${userdetails.password}`,
            "email": `${userdetails.email}`
            
        }).then(res=>{
          console.log("response login success", res.data);
          return (dispatch(fetchUserLoginSuccess(res.data))
          // ,dispatch(fetchUser({user:userdetails.username,token:res.data.token}))
          );
        })
        .catch(error => fetchUserLoginFailure(error.data))
  }
}


const fetchUserRequest = (res) => {
  console.log("fetch user request action called");
  
  return {
    type: FETCH_USER_REQUEST,
    payload : res
  };
};

const fetchUserSuccess = (res) => {
  console.log("fetch user success action called"+ res.token);
  return {
    type: FETCH_USER_SUCCESS,
    payload : res
  };
};

const fetchUserFailure = error => {
  console.log("fetch user failure action called");
  return {
    type: FETCH_USER_FAILURE,
    payload:error
    
  };
};


//  const fetchUser = (data) => {
//   console.log("fetch Data called", data);
//   return dispatch => {
//       dispatch(fetchUserRequest())
//       return  axios.get(`http://localhost:8000/items`, {
//         headers: {
//           'Authorization': `Bearer ${data.token}`
//         }
//       })
      
//         .then(res=>{
//           console.log("response success", res.data);
//           return dispatch(fetchUserSuccess(res.data));
//         })
//         .catch(error => fetchUserFailure(error.data))
//   }
// }


export {
  fetchUserRegister,
  fetchUserRegisterFailure,
  fetchUserRegisterRequest,
  fetchUserRegisterSuccess,
  fetchUserLogin,
  fetchUserLoginFailure,
  fetchUserLoginRequest,
  fetchUserLoginSuccess,
  // fetchUser,
  fetchUserFailure,
  fetchUserRequest,
  fetchUserSuccess,
  logout
};

