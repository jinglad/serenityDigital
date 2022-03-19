import {StyleSheet, Text, View} from 'react-native';
import React, { useEffect } from 'react';
import {Input} from 'react-native-elements/dist/input/Input';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {Button} from 'react-native-elements';
import { useSelector } from 'react-redux';
import {BASE_URL} from '@env';

const Profile = ({navigation}) => {
  const {access_token, user} = useSelector(state => state.videos);

  console.log(user);

  // useEffect(() => {
  //   fetch(`${BASE_URL}/api/accounts/v1/user/`, {
  //     method: 'GET',
  //     headers: {
  //       "content-type": "application/json",
  //       "Authorization": `Token ${access_token}`
  //     }
  //   })
  //   .then(response => response.json())
  //   .then(data => console.log(data))
  //   .catch(error => alert(error.message))
  // },[])

  return (
    <View style={styles.profile}>
      <View style={{marginTop: 30}}>
        <Text style={{color: 'white', fontSize: 18, textAlign: 'center', textTransform: 'capitalize'}}>
          Hi, {user?.username}
        </Text>
        <Text style={{color: 'white', fontSize: 16, textAlign: 'center'}}>
          Your Profile
        </Text>
      </View>
      <View style={{marginTop: 20}}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: 'white',
            marginLeft: 10,
          }}>
          Basic Info
        </Text>
        <View style={{marginLeft: 20}}>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 10,
              marginTop: 10,
              alignItems: 'center',
            }}>
            <Icon type="entypo" name="email" size={30} color="white" />
            <View style={{marginLeft: 10}}>
              <Text style={{color: 'white', fontSize: 18}}>{user?.email}</Text>
              <Text style={{color: 'white', fontSize: 12}}>Email</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 10,
              marginTop: 10,
              alignItems: 'center',
            }}>
            <Icon type="entypo" name="phone" size={30} color="white" />
            <View style={{marginLeft: 10}}>
              <Text style={{color: 'white', fontSize: 18}}>{user?.phone || "Not added"}</Text>
              <Text style={{color: 'white', fontSize: 12}}>Phone</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 10,
              marginTop: 10,
              alignItems: 'center',
            }}>
            <Icon
              type="material-icons"
              name="content-paste"
              size={30}
              color="white"
            />
            <View style={{marginLeft: 10}}>
              <Text style={{color: 'white', fontSize: 18}}>{user?.content_choice || "Not added"}</Text>
              <Text style={{color: 'white', fontSize: 12}}>
                Content You like
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 10,
              marginTop: 10,
              alignItems: 'center',
            }}>
            <Icon type="antdesign" name="home" size={30} color="white" />
            <View style={{marginLeft: 10}}>
              <Text style={{color: 'white', fontSize: 18}}>{user?.country || "Not added"}</Text>
              <Text style={{color: 'white', fontSize: 12}}>Country</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 10,
              marginTop: 10,
              alignItems: 'center',
            }}>
            <Icon type="entypo" name="language" size={30} color="white" />
            <View style={{marginLeft: 10}}>
              <Text style={{color: 'white', fontSize: 18}}>
                {user?.language || "Not added"}
              </Text>
              <Text style={{color: 'white', fontSize: 12}}>Language</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 10,
              marginTop: 10,
              alignItems: 'center',
            }}>
            <Icon type="antdesign" name="user" size={30} color="white" />
            <View style={{marginLeft: 10}}>
              <Text style={{color: 'white', fontSize: 16}}>{user?.gender || "Not added"}</Text>
              <Text style={{color: 'white', fontSize: 12}}>Gender</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 10,
              marginTop: 10,
              alignItems: 'center',
            }}>
            <Icon
              type="font-awesome"
              name="birthday-cake"
              size={30}
              color="white"
            />
            <View style={{marginLeft: 10}}>
              <Text style={{color: 'white', fontSize: 16}}>{user?.age || "Not added"}</Text>
              <Text style={{color: 'white', fontSize: 12}}>Age</Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Button
          title="Edit Profile"
          containerStyle={{
            height: 60,
            // marginTop: 20,
            width: '80%',
          }}
          onPress={() => navigation.navigate('UpdateProfile')}
        />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  profile: {
    backgroundColor: '#232c38',
    height: '100%',
    // marginTop: 20,
    // flex: 1,
    // alignItems: 'center',
  },
  // text: {
  //   color: 'white',
  //   textAlign: 'center',
  // },
});
