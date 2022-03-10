import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import HomeScreen from './screens/HomeScreen';
import Registration from './screens/Registration';
import Login from './screens/Login';
// import configureStore from './redux/store';
import {Provider} from 'react-redux';
import CategoryScreen from './screens/CategoryScreen';
import VideoScreen from './screens/VideoScreen';
import { PersistGate } from 'redux-persist/integration/react';
import reduxStore from "./redux/store";
// import store from './redux/store';

const App = () => {
  const Stack = createNativeStackNavigator();
  // const store = configureStore();
  const {store, persistor} = reduxStore();

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
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
        </NavigationContainer>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
