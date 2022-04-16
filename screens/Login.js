import {Alert, Platform, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {KeyboardAvoidingView} from 'react-native';
import {Button, Divider, Input} from 'react-native-elements';
// import { AntDesign } from "@expo/vector-icons";
// import { Entypo } from "@expo/vector-icons";
// import { useSelector } from "react-redux";
import {BASE_URL} from '@env';
import {useDispatch, useSelector} from 'react-redux';
import {setAccessToken, setUser} from '../redux/actions';
import { getUserInfo } from '../data/getUserInfo';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loader, setLoader] = useState(false);

  const {access_token} = useSelector(state => state.videos);

  const dispatch = useDispatch();

  // console.log(access_token);

  const signIn = () => {
    // console.log(username, password);
    setLoader(true);
    fetch(`${BASE_URL}/api/accounts/v1/login/`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        setLoader(false);
        setEmail('');
        setPassword('');
        if (data?.token) {
          // console.log(data);
          dispatch(setAccessToken(data?.token));
          dispatch(setUser(data));
          navigation.navigate('CategoryTab');
        } else {
          Alert.alert(
            'Warning','Could not authenticate user! please try again with correct credential',
          );
        }
      })
      .catch(error => alert(error.message));
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      {/* <StatusBar style='dark' /> */}
      <View style={styles.registrationTop}>
        <Text style={styles.heading}>Hello Again</Text>
        <Text style={styles.subHeading}>Welcome back you’ve been missed!</Text>
      </View>
      <View>
        <View style={styles.registrationForm}>
          <Input
            placeholder="Email"
            // leftIcon={<AntDesign name="mail" size={24} color="white" />}
            // autoFocus
            type="email"
            value={email}
            onChangeText={text => setEmail(text)}
            containerStyle={styles.input}
            style={{color: 'white', fontSize: 14}}
          />
          <Input
            placeholder="Password"
            // leftIcon={<Entypo name="lock" size={24} color="white" />}
            // autoFocus
            secureTextEntry
            type="password"
            value={password}
            onChangeText={text => setPassword(text)}
            containerStyle={styles.input}
            style={{color: 'white', fontSize: 14}}
          />
        </View>
        <Button
          title={loader ? 'Loading...' : 'Login'}
          buttonStyle={{
            height: 60,
            borderRadius: 10,
            backgroundColor: '#E61E05',
          }}
          containerStyle={{
            marginTop: 30,
            marginBottom: 30,
          }}
          onPress={signIn}
        />
        {/* <Divider width={2} /> */}
        {/* <Button
          title="Sign in with Google"
          containerStyle={{marginTop: 20}}
          buttonStyle={{height: 60, borderRadius: 10}}
          // icon={<AntDesign name="google" size={24} color="black" />}
        /> */}
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#232c38',
  },
  heading: {
    fontWeight: '700',
    fontSize: 24,
    textAlign: 'center',
    color: 'white',
  },
  subHeading: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 5,
    color: 'white',
  },
  registrationTop: {
    // marginTop: 80,
  },
  registrationForm: {
    marginTop: 30,
    width: 300,
  },
});
