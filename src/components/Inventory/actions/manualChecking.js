import action_types from './actionTypes';
import axiosInstance from '../../../helpers/axios-instance';
import { url } from '../../../helpers/urls';
export function manualCheckSuccess(response) {
  return (dispatch) => {
    dispatch({
      payload: response,
      type: action_types.CHECK_INOUT_SUCCESS,
    });
  };
}

export function manaualCheckOutEventReceived(payload) {
  return (dispatch) => {
    dispatch({
      payload: payload,
      type: action_types.MANUAL_CHECK_OUT_EVENT_RECEIVED,
    });
  };
}

export function manaualCheckInEventReceived(payload) {
  console.log('executing check in event action');
  return (dispatch) => {
    dispatch({
      payload: payload,
      type: action_types.MANUAL_CHECK_IN_EVENT_RECEIVED,
    });
  };
}

const manualCheckInOut = (payload) => {
  console.log('executing check in event action bogus');
  return (dispatch) => {
    return axiosInstance
      .get(
        url +
          '/client/apis/manualCheckInOut/?user_id=' +
          payload.user_id +
          '&inv_id=' +
          payload.inventory_id +
          '&action=' +
          payload.action,
      )
      .then((response) => dispatch(manualCheckSuccess(response.data)));
  };
};

export default manualCheckInOut;
