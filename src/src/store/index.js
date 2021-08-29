import { combineReducers } from "redux";
import globalReducer from "@/store/slices/GlobalSlice";
import inventorySlice from "@/store/slices/InventorySlice";

export default combineReducers({
  globalSlice: globalReducer,
  inventorySlice: inventorySlice,
});
