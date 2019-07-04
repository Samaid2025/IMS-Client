import action_types from '../actions/actionTypes';
import inventoryRequests from '../inventoryListsByFilter/inventoryRequests';
const initialState = {
  productTypes: [],
  postedProduct: {},
  productList: [],
  inventoryRequestResponse: null,
  inventoryRequests: [],
  requestedInventory: [],
  shippedInventory: [],
  shipInventoryResponse: null,
  checkedInInventory: [],
  checkoutInventory: [],
  checkInOutResponse: null,
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
      let request_product_id = action.payload.data.product.id;

      return {
        ...state,
        inventoryRequests: state.inventoryRequests.filter((item) => {
          return item.id !== request_id;
        }),
        inventoryRequests: state.inventoryRequests.filter((item) => {
          return item.product.id !== request_product_id;
        }),
      };

    case action_types.INVENTORY_REQUEST_APPROVED:
      return {
        ...state,
        productList: state.productList.concat(action.payload.data.product),
      };

    case action_types.REQUEST_INVENTORY_SUCCESS:
      return {
        ...state,
        inventoryRequestResponse: action.payload,
      };

    case action_types.DECLINE_INVENTORY_EVENT_RECEIVED:
      let declined_request_id = action.payload.data.id;
      return {
        ...state,
        inventoryRequests: state.inventoryRequests.filter((item) => {
          return item.id !== declined_request_id;
        }),
      };

    case action_types.INVENTORY_DECLINED_EVENT_RECEIVED:
      let declined_request_ID = action.payload.data.id;
      let declined_product_id = action.payload.data.product.id;
      console.log('this should concat', action.payload.data.product);
      return {
        ...state,
        productList: state.productList.concat(action.payload.data.product),
        requestedInventory: state.requestedInventory.filter((item) => {
          return item.id !== declined_request_ID;
        }),
      };

    case action_types.INVENTORY_SHIP_SUCCESS:
      return {
        ...state,
        shipInventoryResponse: action.payload,
      };

    case action_types.SHIP_INEVNTORY_EVENT_RECEIVED:
      let shipped_product_id = action.payload.data.product.id;

      return {
        ...state,
        productList: state.productList.filter((item) => {
          return item.id !== shipped_product_id;
        }),
        checkedInInventory: state.checkedInInventory.filter((item) => {
          return item.id !== shipped_product_id;
        }),
        shippedInventory: state.shippedInventory.concat(
          action.payload.data.product,
        ),
      };
    case action_types.GET_SHIPPED_INVENTORY_SUCCESS:
      return {
        ...state,
        shippedInventory: action.payload,
      };

    case action_types.GET_CHECKED_IN_INVENTORY_SUCCESS:
      return {
        ...state,
        checkedInInventory: action.payload,
      };
    case action_types.GET_CHECKED_OUT_INVENTORY_SUCCESS:
      return {
        ...state,
        checkoutInventory: action.payload,
      };

    case action_types.CHECK_INOUT_SUCCESS:
      return {
        ...state,
        checkInOutResponse: action.payload,
      };

    case action_types.MANUAL_CHECK_OUT_EVENT_RECEIVED:
      let checked_out_product_id = action.payload.data.product.id;
      return {
        ...state,
        checkedInInventory: state.checkedInInventory.filter((item) => {
          return item.id !== checked_out_product_id;
        }),
        checkoutInventory: state.checkoutInventory.concat(
          action.payload.data.product,
        ),
        productList: state.productList.map((item) =>
          item.id === checked_out_product_id
            ? Object.assign({}, item, action.payload.data.product)
            : item,
        ),
      };

    case action_types.MANUAL_CHECK_IN_EVENT_RECEIVED:
      let checked_in_product_id = action.payload.data.product.id;
      return {
        ...state,
        checkoutInventory: state.checkoutInventory.filter((item) => {
          return item.id !== checked_in_product_id;
        }),
        checkedInInventory: state.checkedInInventory.concat(
          action.payload.data.product,
        ),
        productList: state.productList.map((item) =>
          item.id === checked_out_product_id
            ? Object.assign({}, item, action.payload.data.product)
            : item,
        ),
      };

    default:
      return state;
  }
}
