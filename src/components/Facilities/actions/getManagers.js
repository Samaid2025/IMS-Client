import action_types from './actionTypes';
import axiosInstance from '../../../helpers/axios-instance';
import { url } from '../../../helpers/urls';
export function getManagersSuccess(managers) {
  return (dispatch) => {
    dispatch({
      payload: managers,
      type: action_types['GET-MANAGERS-LIST'],
    });
  };
}
const getManagers = () => {
  return (dispatch) => {
    return axiosInstance
      .get(url + '/client/apis/ManagersList')
      .then((response) => dispatch(getManagersSuccess(response.data.data)));
  };
};

export default getManagers;
