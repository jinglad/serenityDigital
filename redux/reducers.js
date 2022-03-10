import { SET_ACCESS_TOKEN, SET_CATEGORY_TITLE, SET_USER } from "./types";

const initialState = {
  categoryTitle: "",
  user: null,
  access_token: null,
};
const videosReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SET_CATEGORY_TITLE:
      return {
        ...state,
        categoryTitle: action.payload,
      };
    case SET_ACCESS_TOKEN: 
      return {
        ...state,
        access_token: action.payload
      }
    default:
      return state;
  }
};
export default videosReducer;
