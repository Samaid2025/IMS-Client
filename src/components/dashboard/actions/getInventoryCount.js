import action_types from './actionTypes';
import axiosInstance from '../../../helpers/axios-instance';
import { url } from '../../../helpers/urls';
export function getInventoryCountSuccess(counts) {
  return (dispatch) => {
    dispatch({
      payload: counts,
      type: action_types.GET_INVENTORY_COUNTS,
    });
  };
}
const getInventoryCount = (user_id) => {
  return (dispatch) => {
    return axiosInstance
      .get(url + '/client/apis/InventoryListCount?user_id=' + user_id)
      .then((response) =>
        dispatch(getInventoryCountSuccess(response.data.data)),
      );
  };
};

export default getInventoryCount;
