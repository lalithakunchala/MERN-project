import axios from "axios";
import {FETCH_ADMIN_REGISTER_FAILURE,
        FETCH_ADMIN_REGISTER_REQUEST,
        FETCH_ADMIN_REGISTER_SUCCESS,
        FETCH_ADMIN_LOGIN_FAILURE,
        FETCH_ADMIN_LOGIN_REQUEST,
        FETCH_ADMIN_LOGIN_SUCCESS,
        FETCH_ADMIN_FAILURE,
        FETCH_ADMIN_REQUEST,
        FETCH_ADMIN_SUCCESS,LOGOUT} from './actionTypes'

const logout = ()=>{
  return {
    type: LOGOUT
  }
}

const fetchAdminRegisterRequest = () => {
  console.log("fetch user register request action called");
  
  return {
    type: FETCH_ADMIN_REGISTER_REQUEST,
    
  };
};

const fetchAdminRegisterSuccess = (res) => {
  console.log("fetch user register success action called");
  return {
    type: FETCH_ADMIN_REGISTER_SUCCESS,
    payload :res
  };
};

const fetchAdminRegisterFailure = error => {
  console.log("fetch user register failure action called");
  return {
    type: FETCH_ADMIN_REGISTER_FAILURE,
    payload:error
    
    // error: error
  };
};


const fetchAdminRegister = (data) => {
  console.log("fetch register Data called", data);
  return dispatch => {
      dispatch(fetchAdminRegisterRequest())
      return  axios.post(
          "http://localhost:8000/admin/register",
            {
            "name": `${data.name}`,
            "email": `${data.email}`,
            "password": `${data.password}`,
        }).then(res=>{
          console.log("response register success", res.data);
          return dispatch(fetchAdminRegisterSuccess(res.data));
        })
        .catch(error => fetchAdminRegisterFailure(error))
  }
}

const fetchAdminLoginRequest = () => {
  console.log("fetch user login request action called");
  
  return {
    type: FETCH_ADMIN_LOGIN_REQUEST
  };
};

const fetchAdminLoginSuccess = (res) => {
  console.log("fetch admin login success action called");
  return {
    type: FETCH_ADMIN_LOGIN_SUCCESS,
    payload: res,
    
  };
};

const fetchAdminLoginFailure = error => {
  console.log("fetch ADMIN login failure action called");
  return {
    type: FETCH_ADMIN_LOGIN_FAILURE,
    payload:error
    
  };
};


 const fetchAdminLogin = (userdetails) => {
  console.log("fetch admin login data action called",userdetails);
  return dispatch => {
      dispatch(fetchAdminLoginRequest())
      return  axios.post(
          "http://localhost:8000/admin/login",
            {
            
            "password": `${userdetails.password}`,
            "email": `${userdetails.email}`
            
        }).then(res=>{
          console.log("response admin success", res.data);
          return (dispatch(fetchAdminLoginSuccess(res.data))
        //   ,dispatch(fetchAdmin({user:userdetails.username,token:res.data.token}))
          );
        })
        .catch(error => fetchAdminLoginFailure(error.data))
  }
}


const fetchAdminRequest = (res) => {
  console.log("fetch user request action called");
  
  return {
    type: FETCH_ADMIN_REQUEST,
    payload : res
  };
};

const fetchAdminSuccess = (res) => {
  console.log("fetch user success action called"+ res.token);
  return {
    type: FETCH_ADMIN_SUCCESS,
    payload : res
  };
};

const fetchAdminFailure = error => {
  console.log("fetch user failure action called");
  return {
    type: FETCH_ADMIN_FAILURE,
    payload:error
    
  };
};


 const fetchAdmin = (data) => {
  console.log("fetch Data called", data);
  return dispatch => {
      dispatch(fetchAdminRequest())
      return  axios.get(`http://localhost:8000/items/adminitems`, {
        headers: {
          'Authorization': `Bearer ${data.token}`
        }
      })
      
        .then(res=>{
          console.log("response success", res.data);
          return dispatch(fetchAdminSuccess(res.data));
        })
        .catch(error => fetchAdminFailure(error.data))
  }
}


export {
  fetchAdminRegister,
  fetchAdminRegisterFailure,
  fetchAdminRegisterRequest,
  fetchAdminRegisterSuccess,
  fetchAdminLogin,
  fetchAdminLoginFailure,
  fetchAdminLoginRequest,
  fetchAdminLoginSuccess,
  fetchAdmin,
  fetchAdminFailure,
  fetchAdminRequest,
  fetchAdminSuccess,
  logout
};

