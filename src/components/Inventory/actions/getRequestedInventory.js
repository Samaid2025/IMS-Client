import action_types from './actionTypes';
import axiosInstance from '../../../helpers/axios-instance';
import { url } from '../../../helpers/urls';
export function getRequestedInventorySuccess(inventoryItems) {
  return (dispatch) => {
    dispatch({
      payload: inventoryItems,
      type: action_types.GET_REQUESTED_INVENTORY_SUCCESS,
    });
  };
}
const getRequestedInventory = (user_id) => {
  return (dispatch) => {
    return axiosInstance
      .get(url + '/client/apis/RequestsByUserFacility?user_id=' + user_id)
      .then((response) =>
        dispatch(getRequestedInventorySuccess(response.data.data)),
      );
  };
};

export default getRequestedInventory;
