import action_types from './actionTypes';
import axiosInstance from '../../../helpers/axios-instance';
import { url } from '../../../helpers/urls';
export function deleteFacilitySuccess(facilities) {
  return (dispatch) => {
    dispatch({
      payload: facilities,
      type: action_types['DELETE-FACILITY'],
    });
  };
}
const deleteFacility = (id) => {
  return (dispatch) => {
    return axiosInstance
      .delete(url + '/client/apis/DeleteFacility?facility_id=' + id)
      .then((response) => dispatch(deleteFacilitySuccess(response.data)));
  };
};

export default deleteFacility;
