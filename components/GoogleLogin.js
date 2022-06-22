import {AppState, Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {Google_oAuth_client_id, BASE_URL, ios_client_id} from '@env';
import {useDispatch} from 'react-redux';
import {setAccessToken, setUser} from '../redux/actions';

GoogleSignin.configure({
  webClientId: Google_oAuth_client_id,
  offlineAccess: true,
  iosClientId: ios_client_id,
});

const GoogleLogin = ({navigation}) => {
  const dispatch = useDispatch();

  // console.log(BASE_URL);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const userInfo = await GoogleSignin.signIn();
      const {idToken, accessToken} = await GoogleSignin.getTokens();
      console.log(accessToken);
      if (accessToken) {
        if (Platform.OS === 'ios') {
          // console.log(AppState.currentState);
          // if (AppState.currentState === 'active') {
          // console.log('working')
          fetch(`${BASE_URL}/api/accounts/v1/google/login/`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify({access_token: accessToken}),
          })
            .then(res => res.json())
            .then(data => {
              // console.log(data);
              if (data?.token) {
                dispatch(setUser(data.user_info));
                dispatch(setAccessToken(data.token));
                navigation.navigate('CategoryTab');
              } else {
                alert('An error is occured. Please try again');
              }
            })
            .catch(err => console.log(err.message));
          // }
        } else {
          fetch(`${BASE_URL}/api/accounts/v1/google/login/`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify({access_token: accessToken}),
          })
            .then(res => res.json())
            .then(data => {
              if (data?.token) {
                dispatch(setUser(data.user_info));
                dispatch(setAccessToken(data.token));
                navigation.navigate('CategoryTab');
              } else {
                alert('An error is occured. Please try again');
              }
            })
            .catch(err => console.log(err.message));
        }
      }
      // console.log(userInfo2)
      // console.log(userGoogleInfo);
    } catch (error) {
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
      style={styles.androidStyle}
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={signIn}
    />
  );
};

export default GoogleLogin;

const styles = StyleSheet.create({
  androidStyle: {
    width: Platform.OS === 'ios' ? 192 : 300,
    height: Platform.OS === 'ios' ? 48 : 60,
    marginHorizontal: 'auto',
    marginTop: 10,
    borderRadius: 5,
  },
});
