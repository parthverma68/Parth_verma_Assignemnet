import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { makeRootReducer } from "./reducer";


const store = createStore(
 makeRootReducer(),
 applyMiddleware(thunkMiddleware)
)

export default store