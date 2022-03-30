import {
  SET_ACCESS_TOKEN,
  SET_CATEGORY,
  SET_CATEGORY_TITLE,
  SET_USER,
  SET_VIDEOS,
} from './types';

const initialState = {
  categoryTitle: '',
  user: null,
  access_token: null,
  categories: null,
  videos: [],
};
const videosReducer = (state = initialState, action) => {
  // console.log(action);
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
        access_token: action.payload,
      };
    case SET_CATEGORY:
      return {
        ...state,
        categories: action.payload,
      };
    case SET_VIDEOS:
      return {
        ...state,
        videos: action.payload,
      };
    default:
      return state;
  }
};
export default videosReducer;
