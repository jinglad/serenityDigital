import {Image, StyleSheet, Text, View} from 'react-native';
import React, {createContext, useState} from 'react';
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
import {PersistGate} from 'redux-persist/integration/react';
import reduxStore from './redux/store';
import VideoPlayerScreen from './screens/VideoPlayerScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from './screens/Profile';
// import store from './redux/store';
// import Entypo from 'react-native-vector-icons/Entypo';
// import AntDesign from 'react-native-vector-icons/AntDesign';
import {Icon} from 'react-native-elements';
import UpdateProfile from './screens/UpdateProfile';
import SavedVideos from './screens/SavedVideos';
import RecentVideos from './screens/RecentVideos';
import {StripeProvider} from '@stripe/stripe-react-native';
import PaymentScreen from './screens/PaymentScreen';

const CategoryTabs = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let imageSource, type;
          if (route.name == 'Category') {
            // imageSource = require('./assets/images/list.svg');
            imageSource = 'list';
            type = 'ionicon';
          }
          if (route.name == 'Saved') {
            imageSource = 'save';
            type = 'entypo';
          }
          if (route.name == 'Recent') {
            imageSource = 'video';
            type = 'feather';
          }
          if (route.name == 'Profile') {
            imageSource = 'user';
            type = 'evilicon';
          }

          return (
            <Icon name={imageSource} type={type} size={30} color="black" />
          );
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="Category"
        component={CategoryScreen}
        // screenOptions={screenOptions}
      />
      {/* <Tab.Screen name="Videos" component={VideoScreen} /> */}
      <Tab.Screen name="Recent" component={RecentVideos} />
      <Tab.Screen name="Saved" component={SavedVideos} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export const VideosContext = createContext();

const App = () => {
  const Stack = createNativeStackNavigator();
  // const store = configureStore();
  const {store, persistor} = reduxStore();

  const [videoList, setVideoList] = useState([]);

  return (
    <SafeAreaProvider>
      <StripeProvider publishableKey="pk_test_51KeXrmExsbXRovz7Ve5VBK7RLrMst5UZYDmL5izxHiaczqqUrGhGmhz8wwijvUxjJR8SOa6e9LIxIPSai3QhaWh100YSdfWuFb">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <VideosContext.Provider value={[videoList, setVideoList]}>
              <NavigationContainer>
                <Stack.Navigator
                  screenOptions={{
                    headerShown: false,
                  }}>
                  <Stack.Screen name="Home" component={HomeScreen} />
                  <Stack.Screen name="Registration" component={Registration} />
                  <Stack.Screen name="Login" component={Login} />
                  <Stack.Screen name="CategoryTab" component={CategoryTabs} />
                  <Stack.Screen name="Videos" component={VideoScreen} />
                  <Stack.Screen
                    name="VideoPlayer"
                    component={VideoPlayerScreen}
                  />
                  <Stack.Screen
                    name="UpdateProfile"
                    component={UpdateProfile}
                  />
                  <Stack.Screen
                    name="Payment"
                    component={PaymentScreen}
                  />
                </Stack.Navigator>
              </NavigationContainer>
            </VideosContext.Provider>
          </PersistGate>
        </Provider>
      </StripeProvider>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
