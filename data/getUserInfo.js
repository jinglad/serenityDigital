import {BASE_URL} from '@env';
import {Alert} from 'react-native';
import {setUser} from '../redux/actions';

export const getUserInfo = async (id, access_token, dispatch, navigation) => {
  const response = await fetch(`${BASE_URL}/api/accounts/v1/userlist/${id}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Token ${access_token}`,
    },
  });
  const res = await response.json();
  if (response.status === 200) {
    // console.log(res);
    dispatch(setUser(data));
    navigation.navigate('CategoryTab');
  } else if (!response.ok) {
    Alert.alert(
      'An error occured during fetching data. Please try again in a few minutes.',
    );
  }
};
