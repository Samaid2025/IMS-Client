import AddFacility from '../src/components/Facilities/addFacility';
import FacilityList from '../src/components/Facilities/facilityList';
import AddInventory from '../src/components/Inventory/addInventory';
import DashboardContent from './components/dashboard/dashboardContent';
import InventoryList from './components/Inventory/inventoryList';
const routes = [
  {
    path: '/dashboard',
    component: DashboardContent,
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
];

export default routes;
