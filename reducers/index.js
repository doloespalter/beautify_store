import { combineReducers } from 'redux';
import AuthReducer from "./AuthReducer";
import StoreReducer from "./StoreReducer";
import StoreDetailsReducer from "./StoreDetailsReducer";
import ServiceReducer from "./ServiceReducer";
import AppointmentReducer from "./AppointmentReducer";
import UserReducer from "./UserReducer";
import ChatReducer from "./ChatReducer";

export default combineReducers({
    auth: AuthReducer,
    stores: StoreReducer,
    storeDetails: StoreDetailsReducer,
    service:  ServiceReducer,
    appointment: AppointmentReducer,
    user: UserReducer,
    chat: ChatReducer
})
