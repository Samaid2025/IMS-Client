import { combineReducers } from 'redux';
import LoginReducer from './components/Login/LoginReducers/loginReducer';
import FacilitiesReducer from './components/Facilities/reducers/facilitiesReducer';
import InventoryReducer from './components/Inventory/inventoryReducer/inventoryReducer';
import DashboardReducer from './components/dashboard/dashboardReducer/dashboardReducer';
import UserReducer from './components/user/reducer/userReducer';
export default combineReducers({
  LoginReducer,
  FacilitiesReducer,
  InventoryReducer,
  DashboardReducer,
  UserReducer,
});
