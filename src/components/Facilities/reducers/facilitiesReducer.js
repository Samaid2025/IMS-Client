import action_types from '../actions/actionTypes';
const initialState = {
  facilities: [],
  manager: [],
  postedFacility: null,
  facilitiesList: [],
  totalFacilities: 0,
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
    case action_types['GET-ALL-FACILITIES-LIST']:
      return {
        ...state,
        facilitiesList: action.payload.data,
        totalFacilities: action.payload.page_size,
      };
    case action_types['UPDATE_FACILITY']:
      return {
        ...state,
        postedFacility: action.payload,
        facilitiesList:
          action.payload.data !== undefined
            ? state.facilitiesList.map((el) =>
                el.id === action.payload.data.id
                  ? Object.assign({}, el, action.payload.data)
                  : el,
              )
            : state.facilitiesList,
      };

    case action_types['DELETE-FACILITY']:
      return {
        postedFacility: action.payload,
        // facilitiesList: state.facilitiesList.filter((item) => {
        //   return item.id !== action.payload.data.id;
        // }),
      };
    default:
      return state;
  }
}
