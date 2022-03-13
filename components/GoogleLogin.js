import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {Google_oAuth_client_id, BASE_URL} from '@env';

GoogleSignin.configure({
  webClientId: Google_oAuth_client_id,
  offlineAccess: true,
});

const GoogleLogin = ({setUser, setLoaded}) => {
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const userInfo = await GoogleSignin.signIn();
      // console.log(userInfo.idToken);
      if (userInfo.idToken) {
        fetch(`${BASE_URL}/api/accounts/v1/google/login/`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({access_token: userInfo.idToken}),
        })
          .then(res => res.json())
          .then(data => console.log('google auth token ', data));
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
      style={{width: 300, height: 60, marginHorizontal: 'auto', marginTop: 10, borderRadius: 5}}
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={signIn}
      // title="Sign In with Google"
    />
    // <Button title="Google Sign in" />
  );
};

export default GoogleLogin;

const styles = StyleSheet.create({});
