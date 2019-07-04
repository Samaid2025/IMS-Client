import action_types from './actionTypes';
import axiosInstance from '../../../helpers/axios-instance';
import { url } from '../../../helpers/urls';
export function declineInventoryRequestSuccess(response) {
  return (dispatch) => {
    dispatch({
      payload: response,
      type: action_types.REQUEST_INVENTORY_SUCCESS,
    });
  };
}
// event handler for requestee
export function declineInvnetoryEventReceived(event) {
  return (dispatch) => {
    dispatch({
      payload: event,
      type: action_types.DECLINE_INVENTORY_EVENT_RECEIVED,
    });
  };
}
// event handler for requesting facility
export function inventoryRequestDeclined(event) {
  console.log('handling event');
  return (dispatch) => {
    dispatch({
      payload: event,
      type: action_types.INVENTORY_DECLINED_EVENT_RECEIVED,
    });
  };
}

const declineInventoryRequest = (payload) => {
  return (dispatch) => {
    return axiosInstance
      .post(url + '/client/apis/DeclineRequest/', { req_id: payload })
      .then((response) =>
        dispatch(declineInventoryRequestSuccess(response.data)),
      );
  };
};

export default declineInventoryRequest;
