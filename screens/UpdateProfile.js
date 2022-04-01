import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {CheckBox, Input} from 'react-native-elements';
import {BASE_URL} from '@env';
import {setAccessToken, setUser} from '../redux/actions';

const UpdateProfile = ({navigation}) => {
  const {user, access_token} = useSelector(state => state.videos);
  const [name, setName] = useState(user?.full_name);
  const [phone, setPhone] = useState(user?.phone);
  const [country, setCountry] = useState(user?.country);
  const [content, setContent] = useState(user?.content_choice);
  const [age, setAge] = useState(user?.age);
  const [checked, setChecked] = useState(user?.gender);
  const [language, setLanguage] = useState(user?.language);

  const [loader, setLoader] = useState(false);
  // console.log(user);

  const dispatch = useDispatch();

  const submit = () => {
    setLoader(true);
    fetch(`${BASE_URL}/api/accounts/v1/userlist/${user.id}/`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        Authorization: `token ${access_token}`,
      },
      body: JSON.stringify({
        full_name: name,
        phone,
        country,
        content_choice: content,
        gender: checked,
        age,
        language
      }),
    })
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        setLoader(false);
        setChecked("");
        setName("");
        setPhone("");
        setAge("");
        setCountry("");
        setContent("");
        setLanguage("");
        if(data.token) {
          dispatch(setUser(data));
          navigation.navigate('Profile');
        } else {
          alert("An error occured. Please try again in a few moment.");
        }
      })
      .catch(error => alert(error.message));
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={{color: 'white', textAlign: 'center', fontSize: 20}}>
        Hello, {user?.full_name || 'Buddy'}
      </Text>
      <Text style={{color: 'white', textAlign: 'center', fontSize: 16}}>
        Update your profile here
      </Text>
      <View style={{width: 350, marginTop: 40}}>
        <Input
          placeholder="Full Name"
          type="text"
          value={name}
          onChangeText={text => setName(text)}
          containerStyle={styles.inputContainer}
          style={styles.input}
        />
        <Input
          placeholder="Phone"
          type="text"
          value={phone}
          onChangeText={text => setPhone(text)}
          containerStyle={styles.inputContainer}
          style={styles.input}
        />
        <Input
          placeholder="Country"
          type="text"
          value={country}
          onChangeText={text => setCountry(text)}
          containerStyle={styles.inputContainer}
          style={styles.input}
        />
        <Input
          placeholder="Favourite Content"
          type="text"
          value={content}
          onChangeText={text => setContent(text)}
          containerStyle={styles.inputContainer}
          style={styles.input}
        />
        <Input
          placeholder="Language"
          type="text"
          value={language}
          onChangeText={text => setLanguage(text)}
          containerStyle={styles.inputContainer}
          style={styles.input}
        />
        <Input
          placeholder="Age"
          type="number"
          value={age}
          onChangeText={text => setAge(text)}
          containerStyle={styles.inputContainer}
          style={styles.input}
        />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <View>
            <CheckBox
              center
              title="Male"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={checked === 'Male' && true}
              onPress={() => {
                setChecked('Male');
              }}
            />
          </View>
          <View>
            <CheckBox
              center
              title="Female"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={checked === 'Female' && true}
              onPress={() => {
                setChecked('Female');
              }}
            />
          </View>
        </View>
        <View style={{marginTop: 30}}>
          <Button title={loader ? "Loading..." : "Save"} onPress={submit} />
        </View>
        <View style={{height: 100}}></View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#232c38',
    alignItems: 'center',
    // height: "100vh",
  },
  inputContainer: {},
  input: {
    fontSize: 14,
    color: 'white',
  },
});
