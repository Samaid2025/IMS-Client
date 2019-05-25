import { action_types } from '../LoginActions/action_types';
const initialState = {
  loginData: null,
};

export default function LoginReducer(state = initialState, action) {
  switch (action.type) {
    case action_types.LOGIN_SUCCESS:
      return {
        ...state,
        loginData: action.payload,
      };

    default:
      return state;
  }
}
