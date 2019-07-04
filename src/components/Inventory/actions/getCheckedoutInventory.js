import action_types from './actionTypes';
import axiosInstance from '../../../helpers/axios-instance';
import { url } from '../../../helpers/urls';
export function getInventorySuccess(inventoryItems) {
  return (dispatch) => {
    dispatch({
      payload: inventoryItems,
      type: action_types.GET_CHECKED_OUT_INVENTORY_SUCCESS,
    });
  };
}
const getCheckedOutInventory = (user_id) => {
  return (dispatch) => {
    return axiosInstance
      .get(url + '/client/apis/checkOutInv/?user_id=' + user_id)
      .then((response) => dispatch(getInventorySuccess(response.data.data)));
  };
};

export default getCheckedOutInventory;
