import {BASE_URL} from '@env';
import {Alert} from 'react-native';
import {setCategory} from '../redux/actions';

export const getCategory = async (dispatch, access_token) => {
  const response = await fetch(`${BASE_URL}/api/category/v1/categories/`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: 'Token ' + access_token,
    },
  });
  if (response.status === 200) {
    const res = await response.json();
    dispatch(setCategory(res));
  } else if (!response.ok) {
    Alert.alert('An error occured during fething category. Try again');
  }
};
