import { createStore, combineReducers } from "redux";
import videosReducer from "./reducers";
const rootReducer = combineReducers({ videos: videosReducer });
const configureStore = () => {
  return createStore(rootReducer);
};
export default configureStore;