import { action_types } from './actionTypes';
import axiosInstance from '../../../helpers/axios-instance';
import { url } from '../../../helpers/urls';
export function getReportSuccess(managers) {
  return (dispatch) => {
    dispatch({
      payload: managers,
      type: action_types.DOWNLOAD_REPORT_SUCCESS,
    });
  };
}
const downloadExpirationReport = (payload) => {
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
      .then((response) => dispatch(getReportSuccess(response.data)));
  };
};

export default downloadExpirationReport;
