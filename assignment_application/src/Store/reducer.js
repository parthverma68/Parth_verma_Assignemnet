import { combineReducers } from "redux";
import { reducer as InstrumentquotesReducer } from "../modules/assignment_dashboard";

export const makeRootReducer = (asyncReducers = {}) => {
 return combineReducers({
  InstrumentquotesReducer,
  ...asyncReducers
 })
}


export default makeRootReducer