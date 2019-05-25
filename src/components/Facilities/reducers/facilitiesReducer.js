import action_types from '../actions/actionTypes';
const initialState = {
  facilities: [],
  manager: [],
  postedFacility: null,
};

export default function FacilitiesReducer(state = initialState, action) {
  switch (action.type) {
    case action_types['GET-FACILITIES-LIST']:
      return {
        ...state,
        facilities: action.payload,
      };
    case action_types['GET-MANAGERS-LIST']:
      return {
        ...state,
        manager: action.payload,
      };
    case action_types['ADD-FACILITY']:
      return {
        ...state,
        postedFacility: action.payload,
      };
    default:
      return state;
  }
}
