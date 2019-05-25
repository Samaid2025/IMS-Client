import action_types from './actionTypes';
import axiosInstance from '../../../helpers/axios-instance';
export function addFacilitySuccess(facilities) {
  return (dispatch) => {
    dispatch({
      payload: facilities,
      type: action_types['ADD-FACILITY'],
    });
  };
}
const postFacility = (payload) => {
  return (dispatch) => {
    return axiosInstance
      .post('http://192.168.10.104:8080/client/apis/AddFacility', payload)
      .then((response) => dispatch(addFacilitySuccess(response.data)));
  };
};

export default postFacility;
