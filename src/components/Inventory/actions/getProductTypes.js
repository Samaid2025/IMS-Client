import action_types from './actionTypes';
import axiosInstance from '../../../helpers/axios-instance';
import { url } from '../../../helpers/urls';
export function getTypesSuccess(managers) {
  return (dispatch) => {
    dispatch({
      payload: managers,
      type: action_types.GET_PRODUCT_TYPES,
    });
  };
}
const getProductTypes = () => {
  return (dispatch) => {
    return axiosInstance
      .get(url + '/client/apis/InventoryTypes')
      .then((response) => dispatch(getTypesSuccess(response.data.data)));
  };
};

export default getProductTypes;
