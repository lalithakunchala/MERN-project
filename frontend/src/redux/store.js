import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import ItemReducer from "./item/reducer";
import UserReducer from "./userauth/reducer";
import AdminReducer from "./adminauth/reducer";


const rootReducer = combineReducers({ userauth:UserReducer,adminauth:AdminReducer,item:ItemReducer});

let composeEnhancers = compose;

if (process.env.NODE_ENV !== "production") {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
}

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(rootReducer, enhancer);

export default store;