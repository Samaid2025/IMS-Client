import { action_types } from './actionTypes';
import axiosInstance from '../../../helpers/axios-instance';
import { url } from '../../../helpers/urls';
export function updateReportSuccess(response) {
  return (dispatch) => {
    dispatch({
      payload: response,
      type: action_types.UPDATE_REPORT_SUCCESS,
    });
  };
}
const updateAutoReport = (payload) => {
  return (dispatch) => {
    return axiosInstance
      .get(
        url +
          '/client/apis/UpdateReport?recipients_list=' +
          payload.users +
          '&report_id=' +
          payload.id +
          '&interval=' +
          payload.interval,
      )
      .then((response) => dispatch(updateReportSuccess(response.data)));
  };
};

export default updateAutoReport;
