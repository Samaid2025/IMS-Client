import { action_types } from './actionTypes';
import axiosInstance from '../../../helpers/axios-instance';
import { url } from '../../../helpers/urls';
export function getReportSuccess(managers) {
  console.log('post expire response');
  return (dispatch) => {
    dispatch({
      payload: managers,
      type: action_types.GET_REPORT_SUCCESS,
    });
  };
}
const getExpirationReport = (payload) => {
  return (dispatch) => {
    return axiosInstance
      .get(
        url +
          '/client/apis/ExpiringReports?user_id=' +
          payload.user_id +
          '&file_format=' +
          payload.file_format +
          '&from_date=' +
          payload.from_date +
          '&to_date=' +
          payload.to_date,
      )
      .then((response) => dispatch(getReportSuccess(response.data.link)));
  };
};

export default getExpirationReport;
