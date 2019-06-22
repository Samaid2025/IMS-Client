import action_types from '../actions/actionTypes';
import inventoryRequests from '../inventoryListsByFilter/inventoryRequests';
const initialState = {
  productTypes: [],
  postedProduct: {},
  productList: [],
  inventoryRequestResponse: null,
  inventoryRequests: [],
  requestedInventory: [],
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

    case action_types.REQUEST_INVENTORY_SUCCESS:
      return {
        ...state,
        inventoryRequestResponse: action.payload,
      };

    case action_types.GET_INVENTORY_REQUESTS_SUCCESS:
      return {
        ...state,
        inventoryRequests: action.payload,
      };

    case action_types.INVENTORY_REQUEST_RECEIVED:
      return {
        ...state,
        inventoryRequests: state.inventoryRequests.concat(action.payload.data),
      };

    case action_types.INVENTORY_REQUEST_MADE:
      let product_id = action.payload.data.product.id;
      console.log('product id', product_id);
      console.log(state.productList);
      return {
        ...state,
        productList: state.productList.filter((item) => {
          return item.id !== product_id;
        }),
      };

    case action_types.GET_REQUESTED_INVENTORY_SUCCESS:
      return {
        ...state,
        requestedInventory: action.payload !== undefined ? action.payload : [],
      };
    case action_types.ACCEPT_REQUEST_SUCCESS:
      return {
        ...state,
        postedProduct: action.payload,
      };

    case action_types.ACCEPT_REQUEST_EVENT_RECEIVED:
      let request_id = action.payload.data.id;
      console.log('filtering ', request_id);
      console.log(state.productList);
      return {
        ...state,
        inventoryRequests: state.inventoryRequests.filter((item) => {
          return item.id !== request_id;
        }),
      };

    default:
      return state;
  }
}
