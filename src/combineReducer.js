import { combineReducers } from 'redux';
import LoginReducer from './components/Login/LoginReducers/loginReducer';
import FacilitiesReducer from './components/Facilities/reducers/facilitiesReducer';
export default combineReducers({
  LoginReducer,
  FacilitiesReducer,
});
