import AddFacility from '../src/components/Facilities/addFacility';
import FacilityList from '../src/components/Facilities/facilityList';
import AddInventory from '../src/components/Inventory/addInventory';
import DashboardContent from './components/dashboard/dashboardContent';
import InventoryList from './components/Inventory/inventoryList';
import AddUser from './components/user/addUser';
import UserList from './components/user/userList';
import Reports from './components/reports/report';
const routes = [
  {
    path: '/dashboard',
    component: DashboardContent,
  },
  {
    path: '/addUser',
    component: AddUser,
  },
  {
    path: '/users',
    component: UserList,
  },
  {
    path: '/addFacility',
    component: AddFacility,
  },
  {
    path: '/FacilityList',
    component: FacilityList,
  },
  {
    path: '/addInventory',
    component: AddInventory,
  },
  {
    path: '/inventory/:filter',
    component: InventoryList,
  },
  {
    path: '/reports',
    component: Reports,
  },
];

export default routes;
