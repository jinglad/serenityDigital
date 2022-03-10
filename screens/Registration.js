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
// import { setUser } from "../Redux/actions";
// import { StatusBar } from 'expo-status-bar'
// import Icon from 'react-native-vector-icons/Entypo';
import {BASE_URL} from '@env';
import CustomModal from '../components/Modal';
// import GoogleLogin from "../components/GoogleLogin";

const Registration = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);

  // const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.videos);

  const signUp = () => {
    // const newUser = {
    //   username,
    //   email,
    //   password,
    //   password2: password
    // };

    // alert(email, password);

    // const url = BASE_URL;
    // alert(url);
    // console.log(url)

    fetch(`${BASE_URL}/api/accounts/v1/register/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
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
        // console.log('data ', data);
        // alert('Your registration done successfully');
        setOpen(true);
      })
      .catch(error => alert(error.message));

    // if (newUser) {
    //   // dispatch(setUser(newUser));
    //   navigation.navigate("Login");
    // } else {
    //   alert("You are not successfully registered. Please try again");
    // }
    // navigation.navigate('Category')
  };

  // const signOut = async () => {
  //   try {
  //     await GoogleSignin.signOut();
  //     console.log("sign out successfully")
  //     // this.setState({ user: null }); // Remember to remove the user from your app's state as well
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <>
      <View style={styles.container} behavior="padding">
        {/* <StatusBar style='dark' /> */}
        <View style={styles.registrationTop}>
          <Text style={styles.heading}>Hello Mate</Text>
          <Text style={styles.subHeading}>Welcome to our app</Text>
        </View>
        <View>
          <View style={styles.registrationForm}>
            <Input
              placeholder="Enter username"
              // leftIcon={<Icon name="add-user" size={24} color="white" />}
              // autoFocus
              type="text"
              value={username}
              onChangeText={text => setUsername(text)}
              containerStyle={styles.input}
              style={{color: 'white', fontSize: 14}}
            />
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
              placeholder="password"
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
            title="Register"
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
          <Divider width={2} />
          {/* <Button
          title="Sign Out"
          containerStyle={{ marginTop: 20 }}
          buttonStyle={{ height: 60, borderRadius: 10 }}
          onPress={signOut}
          // icon={<AntDesign name="google" size={24} color="black" />}
        /> */}
          <GoogleLogin setUser={setUser} setLoaded={setLoaded} />
        </View>
      </View>
      <Button title="Show modal" onPress={() => setOpen(true)} />
      <CustomModal open={open} onClose={() => setOpen(false)}>
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
