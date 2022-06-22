import {Alert, StyleSheet, Text, View, StatusBar} from 'react-native';
import React, {useState} from 'react';
import {Button, Input} from 'react-native-elements';
import {BASE_URL} from '@env';

const Forgotpass = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [loader, setLoader] = useState(false);

  const handleSubmitEmail = async () => {
    setLoader(true);
    const response = await fetch(`${BASE_URL}/dj-rest-auth/password/reset/`, {
      method: 'POST',
      headers: {
        "content-type":"application/json"
      },
      body: JSON.stringify({email})
    })
    setLoader(false);
    // console.log("response ", response.status);
    // Alert.alert("Error", "Server Error");
    // const res = await response.json();
    if(response.ok) {
      // console.log(res);
      Alert.alert("Forgot password","Password reset e-mail has been sent. If you cannot find, please check your spam folder as well");
    } else if(!response.ok) {
      Alert.alert("Error","Server error.")
    }
  }

  return (
    <View style={styles.container}>
      <View style={{width: 300}}>
        <Text style={{color: 'white', textAlign: 'center', marginBottom: 20}}>Enter your email</Text>
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
        <Button
          title={loader ? 'Loading...' : 'Submit'}
          onPress={handleSubmitEmail}
        />
      </View>
    </View>
  );
};

export default Forgotpass;

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#232c38',
  },
});
