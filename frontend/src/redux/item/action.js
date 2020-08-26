import axios from "axios";
import {FILTER,ADD_REQUEST,ADD_SUCCESS,ADD_FAILURE,FETCH_ITEM_REQUEST,FETCH_ITEM_SUCCESS,FETCH_ITEM_FAILURE,FETCH_ADMIN_ITEM_REQUEST,FETCH_ADMIN_ITEM_SUCCESS,FETCH_ADMIN_ITEM_FAILURE,UPDATE_REQUEST,UPDATE_SUCCESS,UPDATE_FAILURE,DELETE_REQUEST,DELETE_SUCCESS,DELETE_FAILURE} from './actionTypes'

const filter = (res)=>{
  console.log("filetr"+ res)
  return{
    type: FILTER,
    payload:res
  }
}

const addRequest = () => {
  console.log("fetch add request");
  
  return {
    type: ADD_REQUEST,
    
  };
};

const addSuccess = (res) => {
  // console.log("fetch post success action called"+ res);
  return {
    type: ADD_SUCCESS,
    payload : res
  };
};

const addFailure = error => {
  // console.log("fetch post failure action called");
  return {
    type: ADD_FAILURE,
    payload:error
    // error: error
  };
};


const addItem= (n,t) => {
  var token =  t
  var data = {
    "category" : n.category,
    "price" : n.price,
    "image" : n.image,
    "rating" : n.rating
  }
  var header = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  console.log("data",data);
  console.log("token",token)
  return dispatch => {
      dispatch(addRequest())
      return  axios.post(
          "http://localhost:8000/items",data,header)
          .then(res=>{
          console.log("response success", res.data);
          return dispatch(addSuccess(res.data));
        })
        .catch(error => addFailure(error))
  }
}

const fetchItemRequest = () => {
  console.log("fetch post request action called");
  
  return {
    type: FETCH_ITEM_REQUEST,
    
  };
};

const fetchItemSuccess = (res) => {
  // console.log("fetch post success action called"+ res);
  return {
    type: FETCH_ITEM_SUCCESS,
    payload : res
  };
};

const fetchItemFailure = error => {
  // console.log("fetch post failure action called");
  return {
    type: FETCH_ITEM_FAILURE,
    payload:error
    // error: error
  };
};


const fetchItems= (n) => {
  // console.log("fetch Data called", data);
  return dispatch => {
      dispatch(fetchItemRequest())
      return  axios.get(
          `http://localhost:8000/items?page=${n}`
            ).then(res=>{
          console.log("response success", res.data);
          return dispatch(fetchItemSuccess(res.data));
        })
        .catch(error => fetchItemFailure(error))
  }
}


const fetchAdminItemRequest = () => {
  console.log("fetch post request action called");
  
  return {
    type: FETCH_ADMIN_ITEM_REQUEST,
    
  };
};

const fetchAdminItemSuccess = (res) => {
  // console.log("fetch post success action called"+ res);
  return {
    type: FETCH_ADMIN_ITEM_SUCCESS,
    payload : res
  };
};

const fetchAdminItemFailure = error => {
  // console.log("fetch post failure action called");
  return {
    type: FETCH_ADMIN_ITEM_FAILURE,
    payload:error
    // error: error
  };
};


const fetchAdminItems= (n) => {
  // console.log("fetch Data called", data);
  return dispatch => {
      dispatch(fetchAdminItemRequest())
      return  axios.get(
          `http://localhost:8000/items/adminitems/${n}`
            ).then(res=>{
          console.log("response success", res.data);
          return dispatch(fetchAdminItemSuccess(res.data));
        })
        .catch(error => fetchAdminItemFailure(error))
  }
}


const updateRequest = () => {
  console.log("fetch UPDATE request action called");
  
  return {
    type: UPDATE_REQUEST,
    
  };
};

const updateSuccess = (res) => {
  console.log("fetch post success action called"+ res);
  return {
    type: UPDATE_SUCCESS,
    payload : res
  };
};

const updateFailure = error => {
  console.log("fetch post failure action called");
  return {
    type: UPDATE_FAILURE,
    payload:error
    // error: error
  };
};


const updateItem = (n) => {
  console.log("fetch Data called"+ n.id +" "+n.price);
  var url = `http://localhost:8000/items/${n.id}`;
  console.log(url);
  return dispatch => {
      dispatch(updateRequest())
      return  axios.patch(`http://localhost:8000/items/`+n.id,{ price:n.price })
      .then(res=>{
          console.log("response success", res.data);
          return (
                dispatch(updateSuccess(res.data))
          )
        })
        .catch(error => updateFailure(error))
  }
}

const deleteRequest = () => {
  console.log("fetch post request action called");
  
  return {
    type: DELETE_REQUEST,
    
  };
};

const deleteSuccess = (res) => {
  // console.log("fetch post success action called"+ res);
  return {
    type: DELETE_SUCCESS,
    payload : res
  };
};

const deleteFailure = error => {
  // console.log("fetch post failure action called");
  return {
    type: DELETE_FAILURE,
    payload:error
    // error: error
  };
};


const deleteItem= (id) => {
  console.log("fetch Data called", id);
  return dispatch => {
      dispatch(deleteRequest())
      return  axios.delete(
          `http://localhost:8000/items/${id}`
            ).then(res=>{
          console.log("response success", res.data);
          return dispatch(deleteSuccess(res.data));
        })
        .catch(error => deleteFailure(error))
  }
}

export {fetchItems,updateItem,deleteItem,fetchAdminItems,addItem,filter}
