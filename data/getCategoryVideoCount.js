import {BASE_URL} from '@env';
import {Alert} from 'react-native';

export const getCategoryVideoCount = async (
  dispatch,
  access_token,
  category,
) => {
  const response = await fetch(
    `${BASE_URL}/api/category/v1/videos_by_category_count/?category=${category}`,
    {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: 'Token ' + access_token,
      },
    },
  );
  const res = await response.json();
  if (response.status === 200) {
    // console.log(res);
    return res;
  } else if (!response.ok) {
    Alert.alert('An error occured during fething category. Try again');
  }
};
