import action_types from '../actions/actionTypes';
const initialState = {
  productTypes: [],
  postedProduct: {},
  productList: [],
};

export default function InventoryReducer(state = initialState, action) {
  switch (action.type) {
    case action_types.GET_PRODUCT_TYPES:
      return {
        ...state,
        productTypes: action.payload,
      };

    case action_types.POST_INVENTORY:
      return {
        ...state,
        postedProduct: action.payload,
      };

    case action_types.ADD_INVENTORY_ITEMS:
      return {
        ...state,
        productList: action.payload !== undefined ? action.payload : [],
      };

    default:
      return state;
  }
}