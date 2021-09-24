import { combineReducers } from "redux";
import inventorySlice from "@/store/slices/InventorySlice";
import EventSlice from "@/store/slices/EventSlice";

export default combineReducers({
  inventorySlice: inventorySlice,
  eventSlice: EventSlice,
});
