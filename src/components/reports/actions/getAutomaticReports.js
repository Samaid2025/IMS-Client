import { action_types } from './actionTypes';
import axiosInstance from '../../../helpers/axios-instance';
import { url } from '../../../helpers/urls';
export function getReportSuccess(managers) {
  console.log('manager ', managers);
  return (dispatch) => {
    dispatch({
      payload: managers,
      type: action_types.GET_AUTO_REPORT_SUCCESS,
    });
  };
}
const getAytomaticReports = (payload) => {
  return (dispatch) => {
    return axiosInstance
      .get(url + '/client/apis/UsersRecipientsList')
      .then((response) => dispatch(getReportSuccess(response.data.data)));
  };
};

export default getAytomaticReports;
