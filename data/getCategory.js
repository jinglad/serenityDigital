import {BASE_URL} from '@env';
import { setCategory } from '../redux/actions';

export const getCategory = async (dispatch, access_token) => {
  const response = await fetch(`${BASE_URL}/api/category/v1/categories/`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: 'Token ' + access_token,
    }
  })
  const res = await response.json();
  // console.log(res);
  if(response.status === 200) {
    dispatch(setCategory(res));
    // console.log(res);
  } 
  if(!response.ok) {
    alert("An error occured during fething category. Try again");
  }
}