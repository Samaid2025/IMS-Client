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
const getInventoryByExpiration = (payload) => {
  return (dispatch) => {
    return axiosInstance
      .get(
        url +
          '/client/apis/InvListByExp/?user_id=' +
          payload.user_id +
          '&date=' +
          payload.date,
      )
      .then((response) =>
        dispatch(getInventoryItemsSuccess(response.data.data)),
      );
  };
};

export default getInventoryByExpiration;
