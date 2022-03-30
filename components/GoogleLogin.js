import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {Google_oAuth_client_id, BASE_URL} from '@env';
import { useDispatch } from 'react-redux';
import { setAccessToken, setUser } from '../redux/actions';

GoogleSignin.configure({
  webClientId: Google_oAuth_client_id,
  offlineAccess: true,
});

const GoogleLogin = ({navigation}) => {

  const dispatch = useDispatch();

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const userInfo = await GoogleSignin.signIn();
      const {idToken, accessToken} = await GoogleSignin.getTokens();
      if (accessToken) {
        fetch(`${BASE_URL}/api/accounts/v1/google/login/`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({access_token: accessToken}),
        })
          .then(res => res.json())
          .then(data => {
            if(data?.token) {
              dispatch(setUser(data));
              dispatch(setAccessToken(data.token));
              navigation.navigate('CategoryTab');
            }
          })
          .catch(err => console.log(err.message));
      }
      // console.log(userInfo2)
      // console.log(userGoogleInfo);
    } 
    catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // console.log('Sign ');
        alert(error.message);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert(error.message);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert(error.message);
      } else {
        alert(error.message);
      }
    }
  };

  return (
    <GoogleSigninButton
      style={{
        width: 300,
        height: 60,
        marginHorizontal: 'auto',
        marginTop: 10,
        borderRadius: 5,
      }}
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={signIn}
    />
  );
};

export default GoogleLogin;

const styles = StyleSheet.create({});
