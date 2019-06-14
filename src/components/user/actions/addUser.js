import action_types from './actionTypes';
import axiosInstance from '../../../helpers/axios-instance';
import { url } from '../../../helpers/urls';
export function addUserSuccess(user) {
  return (dispatch) => {
    dispatch({
      payload: user,
      type: action_types['ADD_USER'],
    });
  };
}
const addUser = (payload) => {
  return (dispatch) => {
    return axiosInstance
      .post(url + '/client/apis/AddUser', payload)
      .then((response) => dispatch(addUserSuccess(response.data)));
  };
};

export default addUser;
