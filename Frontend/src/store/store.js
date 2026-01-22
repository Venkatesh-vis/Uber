import userReducer from "../reducers/userReducer.js";
import {combineReducers, createStore} from "redux";
import sharedReducer from "../reducers/sharedReducer.js";
import captainReducer from "../reducers/captainReducer.js";


const rootReducer = combineReducers({
    user: userReducer,
    captain: captainReducer,
    shared: sharedReducer,
});

export const store = createStore(rootReducer);