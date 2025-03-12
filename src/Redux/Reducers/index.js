import { combineReducers } from "redux";
import { todoSlice } from "./todoReducer";

const reducers=combineReducers({
    todo:todoSlice.reducer,
})

export default reducers;