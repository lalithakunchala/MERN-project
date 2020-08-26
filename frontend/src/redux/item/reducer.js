import {FILTER,ADD_REQUEST,ADD_SUCCESS,ADD_FAILURE,FETCH_ITEM_REQUEST,FETCH_ITEM_SUCCESS,FETCH_ITEM_FAILURE,FETCH_ADMIN_ITEM_REQUEST,FETCH_ADMIN_ITEM_SUCCESS,FETCH_ADMIN_ITEM_FAILURE,UPDATE_REQUEST,UPDATE_SUCCESS,UPDATE_FAILURE,DELETE_REQUEST,DELETE_SUCCESS,DELETE_FAILURE} from './actionTypes'

const initialState = {
    error: false,
    items:[],
    update:"",
    del :"",
    token : "",
    add:"",
    filterdata:{page:1,category:"",sort:"asc"},
    adminItems:[]
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case FILTER:
            console.log(payload)
            return { ...state, filterdata: payload }

        case FETCH_ITEM_REQUEST:
            return { ...state, error: false }

            case FETCH_ITEM_SUCCESS:
                console.log(payload);
            return { ...state, items: payload }

            case FETCH_ITEM_FAILURE:
            return { ...state, error: true }

            case ADD_REQUEST:
            return { ...state }

            case ADD_SUCCESS:
                console.log(payload);
            return { ...state,add:payload}

            case ADD_FAILURE:
            return { ...state }


            case FETCH_ADMIN_ITEM_REQUEST:
                return { ...state, error: false }
    
                case FETCH_ADMIN_ITEM_SUCCESS:
                    console.log(payload);
                return { ...state, adminItems: payload }
    
                case FETCH_ADMIN_ITEM_FAILURE:
                return { ...state, error: true }

            case UPDATE_REQUEST:
            return { ...state }

            case UPDATE_SUCCESS:
                console.log(payload);
            return { ...state,update:payload }

            case UPDATE_FAILURE:
            return { ...state}


            case DELETE_REQUEST:
            return { ...state}

            case DELETE_SUCCESS:
                console.log(payload);
            return { ...state,del:payload}

            case DELETE_FAILURE:
            return { ...state }


        default:
            return { ...state }
    }
}