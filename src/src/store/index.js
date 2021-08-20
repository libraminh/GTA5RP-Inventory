import { combineReducers } from "redux";
import globalReducer from "@/store/slices/GlobalSlice";

export default combineReducers({
  globalSlice: globalReducer,
});
