import { combineReducers } from 'redux';
import LoginReducer from './components/Login/LoginReducers/loginReducer';
import FacilitiesReducer from './components/Facilities/reducers/facilitiesReducer';
import InventoryReducer from './components/Inventory/inventoryReducer/inventoryReducer';
export default combineReducers({
  LoginReducer,
  FacilitiesReducer,
  InventoryReducer,
});
