import action_types from './actionTypes';
import axiosInstance from '../../../helpers/axios-instance';
import { url } from '../../../helpers/urls';
export function editUserSuccess(user) {
  return (dispatch) => {
    dispatch({
      payload: user,
      type: action_types['EDIT_USER_SUCCESS'],
    });
  };
}
const editUser = (payload) => {
  return (dispatch) => {
    return axiosInstance
      .put(url + '/client/apis/EditUser', payload)
      .then((response) => dispatch(editUserSuccess(response.data)));
  };
};

export default editUser;
