import action_types from './actionTypes';
import axiosInstance from '../../../helpers/axios-instance';
import { url } from '../../../helpers/urls';

export function acceptRequestEventReceived(eventData) {
  return (dispatch) => {
    dispatch({
      payload: eventData,
      type: action_types.ACCEPT_REQUEST_EVENT_RECEIVED,
    });
  };
}

export function inventoryRequestApproved(eventData) {
  return (dispatch) => {
    dispatch({
      payload: eventData,
      type: action_types.INVENTORY_REQUEST_APPROVED,
    });
  };
}

export function acceptRequestSuccess(response) {
  return (dispatch) => {
    dispatch({
      payload: response,
      type: action_types.ACCEPT_REQUEST_SUCCESS,
    });
  };
}
const acceptRequest = (payload) => {
  return (dispatch) => {
    return axiosInstance
      .get(
        url +
          '/client/apis/RequestResponse/?request_id=' +
          payload.request_id +
          '&user_id=' +
          payload.user_id,
      )
      .then((response) => dispatch(acceptRequestSuccess(response.data)));
  };
};

export default acceptRequest;
