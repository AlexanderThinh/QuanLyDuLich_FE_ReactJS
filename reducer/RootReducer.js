import { combineReducers } from "redux";
import infoCustomerReducer from "./InfoCustomerReducer";
import typeUserLoginReducer from "./TypeUserLoginReducer";
import userReducer from "./UserReducer";

const mainReducer = combineReducers({
    user: userReducer,
    infoCustomer: infoCustomerReducer,
    typeUserLogin: typeUserLoginReducer
})

export default mainReducer