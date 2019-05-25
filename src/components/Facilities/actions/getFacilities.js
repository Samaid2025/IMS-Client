import action_types from './actionTypes';
import axiosInstance from '../../../helpers/axios-instance';
export function getFacilitiesSuccess(facilities) {
  return (dispatch) => {
    dispatch({
      payload: facilities,
      type: action_types['GET-FACILITIES-LIST'],
    });
  };
}
const getFacilities = (user_id) => {
  return (dispatch) => {
    return axiosInstance
      .get(
        'http://192.168.10.104:8080/client/apis/FacilitiesList?user_id=' +
          user_id,
      )
      .then((response) => dispatch(getFacilitiesSuccess(response.data.data)));
  };
};

export default getFacilities;
