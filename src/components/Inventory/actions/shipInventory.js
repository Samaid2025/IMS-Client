import action_types from './actionTypes';
import axiosInstance from '../../../helpers/axios-instance';
import { url } from '../../../helpers/urls';
export function shipInventorySuccess(response) {
  return (dispatch) => {
    dispatch({
      payload: response,
      type: action_types.INVENTORY_SHIP_SUCCESS,
    });
  };
}
export function shipInventoryEventReceived(event) {
  console.log('ship inventory event handle');
  return (dispatch) => {
    dispatch({
      payload: event,
      type: action_types.SHIP_INEVNTORY_EVENT_RECEIVED,
    });
  };
}
const shipInventory = (payload) => {
  return (dispatch) => {
    return axiosInstance
      .get(
        url +
          '/client/apis/ShipProduct/?inv_id=' +
          payload.inv_id +
          '&user_id=' +
          payload.user_id,
      )
      .then((response) => dispatch(shipInventorySuccess(response.data)));
  };
};

export default shipInventory;
