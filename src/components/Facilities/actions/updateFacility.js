import action_types from './actionTypes';
import axiosInstance from '../../../helpers/axios-instance';
import { url } from '../../../helpers/urls';
export function updateFacilitySuccess(facilities) {
  return (dispatch) => {
    dispatch({
      payload: facilities,
      type: action_types['UPDATE_FACILITY'],
    });
  };
}
const updateFacility = (payload) => {
  return (dispatch) => {
    return axiosInstance
      .put(url + '/client/apis/EditFacility', payload)
      .then((response) => dispatch(updateFacilitySuccess(response.data)));
  };
};

export default updateFacility;
