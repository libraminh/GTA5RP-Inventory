import { combineReducers } from "redux";
import inventorySlice from "@/store/slices/InventorySlice";

export default combineReducers({
  inventorySlice: inventorySlice,
});
