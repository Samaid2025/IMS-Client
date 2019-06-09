import action_types from './actionTypes';
import axiosInstance from '../../../helpers/axios-instance';
import { url } from '../../../helpers/urls';
export function getInventoryItemsSuccess(inventoryItems) {
  return (dispatch) => {
    dispatch({
      payload: inventoryItems,
      type: action_types.ADD_INVENTORY_ITEMS,
    });
  };
}
const getInventoryItems = (user_id,filter,productType) => {
  return (dispatch) => {
    return axiosInstance
      .get(url + "/client/apis/InventoryList?user_id="+user_id+"&filter="+filter+"&product_type="+productType)
      .then((response) => dispatch(getInventoryItemsSuccess(response.data.data)));
  };
};

export default getInventoryItems;
