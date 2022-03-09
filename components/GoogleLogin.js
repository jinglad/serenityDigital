import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button} from 'react-native-elements';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import {Google_oAuth_client_id} from "@env";


GoogleSignin.configure({
  webClientId: Google_oAuth_client_id,
  offlineAccess: true,
});



const GoogleLogin = ({setUser, setLoaded}) => {

  console.log(Google_oAuth_client_id);

  const signIn = async () => {
    try {
      // console.log("asdsad");
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const userInfo = await GoogleSignin.signIn();
      // const userInfo2 = await GoogleSignin.signInSilently();
      console.log(userInfo);
      // console.log(userInfo2)
      // console.log(userGoogleInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('e 1');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('e 2');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('e 3');
      } else {
        console.log(error);
      }
    }
  };

  return (
    <GoogleSigninButton
      style={{width: 300, height: 60, marginHorizontal: "auto", marginTop: 10}}
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
