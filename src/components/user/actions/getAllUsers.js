import action_types from './actionTypes';
import axiosInstance from '../../../helpers/axios-instance';
import { url } from '../../../helpers/urls';
export function getUsersSuccess(user) {
  return (dispatch) => {
    dispatch({
      payload: user,
      type: action_types['GET_USER_LIST'],
    });
  };
}
const getAllUsers = (user_id) => {
  return (dispatch) => {
    return axiosInstance
      .get(url + '/client/apis/UsersList?user_id=' + user_id)
      .then((response) => dispatch(getUsersSuccess(response.data.data)));
  };
};

export default getAllUsers;
