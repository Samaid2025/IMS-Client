import action_types from './actionTypes';
import axiosInstance from '../../../helpers/axios-instance';
import { url } from '../../../helpers/urls';
export function deleteUserSuccess(user) {
  return (dispatch) => {
    dispatch({
      payload: user,
      type: action_types['DELETE_USER'],
    });
  };
}
const deleteUser = (user_id) => {
  return (dispatch) => {
    return axiosInstance
      .post(url + '/client/apis/DeleteUser', {
        user_id: user_id,
      })
      .then((response) => dispatch(deleteUserSuccess(response.data)));
  };
};

export default deleteUser;
