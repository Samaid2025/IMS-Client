import action_types from './actionTypes';
import axiosInstance from '../../../helpers/axios-instance';
import { url } from '../../../helpers/urls';
export function postInventorySuccess(inventoryItem) {
  return (dispatch) => {
    dispatch({
      payload: inventoryItem,
      type: action_types.POST_INVENTORY,
    });
  };
}
const postInventory = (payload) => {
  console.log(url + '/client/apis/AddInventory');
  return (dispatch) => {
    return axiosInstance
      .post(url + '/client/apis/AddInventory', payload)
      .then((response) => dispatch(postInventorySuccess(response.data)));
  };
};

export default postInventory;
