import { createStore, combineReducers } from "redux";
import videosReducer from "./reducers";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist'

const persistConfig = {
  key: 'serenity digital',
  storage: AsyncStorage,
}

const rootReducer = combineReducers({ videos: videosReducer });

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
  let store = createStore(persistedReducer)
  let persistor = persistStore(store)
  return { store, persistor }
}

// const configureStore = () => {
//   return createStore(rootReducer);
// };
// export default configureStore;