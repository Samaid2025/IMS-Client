import action_types from '../actions/actionTypes';
const initialState = {
  inventoryCounts: {},
};

export default function DashboardReducer(state = initialState, action) {
  switch (action.type) {
    case action_types.GET_INVENTORY_COUNTS:
      return {
        ...state,
        inventoryCounts: action.payload,
      };

    default:
      return state;
  }
}
