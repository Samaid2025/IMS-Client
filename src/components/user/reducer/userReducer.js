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
      console.log(action.payload.data);
      state.userList.map((el) => console.log(el.id === action.payload.data.id));
      return {
        ...state,
        postedUser: action.payload,
        userList: state.userList.map((el) =>
          el.id === action.payload.data.id
            ? Object.assign({}, el, action.payload.data)
            : el,
        ),
      };

    default:
      return state;
  }
}
