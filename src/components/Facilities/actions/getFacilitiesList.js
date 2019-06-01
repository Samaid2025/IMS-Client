import action_types from './actionTypes';
import axiosInstance from '../../../helpers/axios-instance';
import { url } from '../../../helpers/urls';
export function getFacilitiesSuccess(facilities) {
  return (dispatch) => {
    dispatch({
      payload: facilities,
      type: action_types['GET-ALL-FACILITIES-LIST'],
    });
  };
}
const getFacilitiesList = (user_id, page) => {
  console.log('page is', page);
  return (dispatch) => {
    return axiosInstance
      .get(
        url +
          '/client/apis/FacilitiesList?user_id=' +
          user_id +
          '&page=' +
          page,
      )
      .then((response) => dispatch(getFacilitiesSuccess(response.data)));
  };
};

export default getFacilitiesList;
