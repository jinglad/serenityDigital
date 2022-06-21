import {BASE_URL} from '@env';
import {Alert} from 'react-native';

export const getCurrentVideo = async (id, access_token) => {
  const response = await fetch(`${BASE_URL}/api/category/v1/video/${id}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: 'Token ' + access_token,
    },
  });

  const res = await response.json();

  if (response.status === 200) {
    return res;
  } else if (!response.ok) {
    Alert.alert(
      'An error occured fetching Video. Please try again in a few minutes.',
    );
  }
};
