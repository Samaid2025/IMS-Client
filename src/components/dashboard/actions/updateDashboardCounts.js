import action_types from './actionTypes';

export default function updateRequestInventoryCount(payload) {
  return (dispatch) => {
    dispatch({
      payload: payload,
      type: action_types.UPDATE_INVENTORY_REQUEST_COUNT,
    });
  };
}
