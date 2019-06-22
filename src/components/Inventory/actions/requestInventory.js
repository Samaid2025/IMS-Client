import action_types from './actionTypes';
import axiosInstance from '../../../helpers/axios-instance';
import { url } from '../../../helpers/urls';
export function requestInventorySuccess(response) {
  return (dispatch) => {
    dispatch({
      payload: response,
      type: action_types.REQUEST_INVENTORY_SUCCESS,
    });
  };
}
const requestInventory = (payload) => {
  return (dispatch) => {
    return axiosInstance
      .post(url + '/client/apis/RequestProduct/', payload)
      .then((response) => dispatch(requestInventorySuccess(response.data)));
  };
};

export default requestInventory;
