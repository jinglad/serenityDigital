import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Button, Input} from 'react-native-elements';

const Forgotpass = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [loader, setLoader] = useState(false);

  const handleSubmitEmail = () => {
    navigation.navigate('NewPass'); 
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
