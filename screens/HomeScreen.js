import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {Image} from 'react-native';
import {Button} from 'react-native-elements';

const HomeScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <StatusBar status="dark" />
      <KeyboardAvoidingView style={styles.container}>
        <Image
          style={styles.logo}
          source={require('../assets/images/logo.png')}
        />
        <Text style={styles.heading}>Welcome To Our App</Text>
        <Text style={styles.subHeading}>
          Lorem Ipsum is simply dummy text Lorem Ipsum has been the industry's
          standard
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            containerStyle={styles.button}
            buttonStyle={{
              backgroundColor: '#E61E05',
              height: 80,
              width: 150,
              borderRadius: 5,
            }}
            title={'Register'}
            onPress={() => navigation.navigate('Registration')}
          />
          <Button
            containerStyle={styles.button}
            buttonStyle={{
              backgroundColor: '#840D01',
              height: 80,
              width: 150,
              borderRadius: 5,
            }}
            title={'Sign in'}
            onPress={() => navigation.navigate('Login')}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#232c38',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
  logo: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 50,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: 'white',
  },
  subHeading: {
    textAlign: 'center',
    padding: 5,
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 60,
  },
  button: {
    margin: 5,
  },
});
