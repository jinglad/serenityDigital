import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Button, Input, Divider} from 'react-native-elements';
import GoogleLogin from '../components/GoogleLogin';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
// import { AntDesign } from "@expo/vector-icons";
// import { Entypo } from "@expo/vector-icons";
// import { useDispatch, useSelector } from "react-redux";
import {setUser} from '../redux/actions';
// import { StatusBar } from 'expo-status-bar'
// import Icon from 'react-native-vector-icons/Entypo';
import {BASE_URL} from '@env';
import CustomModal from '../components/Modal';
import {useSelector} from 'react-redux';
// import GoogleLogin from "../components/GoogleLogin";

const Registration = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [user, setUser] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);

  const [loader, setLoader] = useState(false);

  // const dispatch = useDispatch();
  const {user} = useSelector(state => state.videos);

  // const signUpCall = async () => {
  //   const response = await fetch(`${BASE_URL}/api/accounts/v1/register/`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       username,
  //       email,
  //       password,
  //       password2: password,
  //     }),
  //   })
  //   const res = await r

  //   if(response.status === 200) console.log()
  // }

  const signUp = () => {
    // var csrfCookie = getCookie('csrftoken');
    // const csrfToken = Cookies.get('csrftoken')
    setLoader(true);
    fetch(`${BASE_URL}/api/accounts/v1/register/`, {
      method: 'POST',
      headers: {
        // Accept: 'application/json',
        'Content-Type': 'application/json',
        // Referer: `${BASE_URL}/api/accounts/v1/register/`,
      },
      body: JSON.stringify({
        username,
        email,
        password,
        password2: password,
      }),
    })
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        setLoader(false);
        if (data.email) {
          setOpen(true);
        } else {
          alert('Registration not done successfully! please try again');
        }
      })
      .catch(error => alert(error.message));
  };

  return (
    <>
      <View style={styles.container} behavior="padding">
        <View style={styles.registrationTop}>
          <Text style={styles.heading}>Hello Mate</Text>
          <Text style={styles.subHeading}>Welcome to our app</Text>
        </View>
        <View>
          <View style={styles.registrationForm}>
            <Input
              placeholder="Username"
              type="text"
              value={username}
              onChangeText={text => setUsername(text)}
              containerStyle={styles.input}
              style={{color: 'white', fontSize: 14}}
            />
            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChangeText={text => setEmail(text)}
              containerStyle={styles.input}
              style={{color: 'white', fontSize: 14}}
            />
            <Input
              placeholder="Password"
              secureTextEntry
              type="password"
              value={password}
              onChangeText={text => setPassword(text)}
              containerStyle={styles.input}
              style={{color: 'white', fontSize: 14}}
            />
          </View>
          <Button
            title={loader ? 'Loading...' : 'Register'}
            buttonStyle={{
              height: 60,
              borderRadius: 10,
              backgroundColor: '#E61E05',
            }}
            containerStyle={{
              marginTop: 30,
              marginBottom: 30,
            }}
            onPress={signUp}
          />
          {/* <Divider width={2} />
          <GoogleLogin setUser={setUser} setLoaded={setLoaded} />
          <Button title="sign out" onPress={signOut} /> */}
        </View>
      </View>
      <CustomModal
        navigation={navigation}
        open={open}
        onClose={() => setOpen(false)}>
        Registration done successfully
      </CustomModal>
    </>
  );
};

export default Registration;

const styles = StyleSheet.create({
  container: {
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#232c38',
    height: '100%',
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
    color: 'white',
  },
  registrationTop: {
    // marginTop: 80,
  },
  registrationForm: {
    marginTop: 30,
    width: 300,
  },
  input: {
    // borderBottomWidth: 0,
    // padding: 10,
    // margin: 10,
    // backgroundColor: "lightgray",
    // borderRadius: 15,
  },
});
