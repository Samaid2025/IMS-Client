import action_types from './actionTypes';
import axiosInstance from '../../../helpers/axios-instance';
import { url } from '../../../helpers/urls';
export function getInventoryRequestsSuccess(inventoryRequests) {
  return (dispatch) => {
    dispatch({
      payload: inventoryRequests,
      type: action_types.GET_INVENTORY_REQUESTS_SUCCESS,
    });
  };
}
const getInventoryRequests = (user_id) => {
  console.log(url + '/client/apis/UserRequests/?user_id=' + user_id);
  return (dispatch) => {
    return axiosInstance
      .get(url + '/client/apis/UserRequests/?user_id=' + user_id)
      .then((response) =>
        dispatch(getInventoryRequestsSuccess(response.data.data)),
      );
  };
};

export default getInventoryRequests;
