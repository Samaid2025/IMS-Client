import action_types from './actionTypes';

export default function invntoryRequestMade(payload) {
  console.log(payload, 'received in action', typeof payload);
  return (dispatch) => {
    dispatch({
      payload: payload,
      type: action_types.INVENTORY_REQUEST_MADE,
    });
  };
}
