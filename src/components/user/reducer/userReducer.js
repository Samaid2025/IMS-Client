import action_types from '../actions/actionTypes';
const initialState = {
  postedUser: {},
  userList: [],
};

export default function UserReducer(state = initialState, action) {
  switch (action.type) {
    case action_types.ADD_USER:
      return {
        ...state,
        postedUser: action.payload,
      };

    case action_types.GET_USER_LIST:
      return {
        ...state,
        userList: action.payload,
      };

    case action_types.EDIT_USER_SUCCESS:
      return {
        ...state,
        postedUser: action.payload,
        userList:
          action.payload.data !== undefined
            ? state.userList.map((el) =>
                el.id === action.payload.data.id
                  ? Object.assign({}, el, action.payload.data)
                  : el,
              )
            : state.userList,
      };

    case action_types.DELETE_USER:
      return {
        ...state,
        postedUser: action.payload,
        userList:
          action.payload.data !== undefined
            ? state.userList.filter((el) => {
                return el.id !== action.payload.data.id;
              })
            : state.userList,
      };

    default:
      return state;
  }
}
