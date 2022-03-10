import { SET_ACCESS_TOKEN, SET_CATEGORY_TITLE, SET_USER } from "./types";

// auth
export function setUser(user){
  return {
    type: SET_USER,
    payload: user,
  }
}

export function setCategoryTitle(categoryTitle) {
  // console.log("action ", categoryTitle)
  return {
    type: SET_CATEGORY_TITLE,
    payload: categoryTitle,
  };
}

export function setAccessToken(token) {
  return {
    type: SET_ACCESS_TOKEN,
    payload: token
  }
}
