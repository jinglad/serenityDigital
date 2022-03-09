import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import HomeScreen from './screens/HomeScreen';
import Registration from './screens/Registration';
import Login from './screens/Login';
import configureStore from './redux/store';
import {Provider} from 'react-redux';
import CategoryScreen from './screens/CategoryScreen';
import VideoScreen from './screens/VideoScreen';

const App = () => {
  const Stack = createNativeStackNavigator();
  const store = configureStore();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Provider store={store}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Registration" component={Registration} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Category" component={CategoryScreen} />
            <Stack.Screen name="Videos" component={VideoScreen} />      
          </Stack.Navigator>
        </Provider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
