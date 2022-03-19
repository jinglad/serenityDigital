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
import {useSelector} from 'react-redux';
import {CheckBox, Input} from 'react-native-elements';
import {BASE_URL} from '@env';

const UpdateProfile = () => {
  const {user, access_token} = useSelector(state => state.videos);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [content, setContent] = useState('');
  const [age, setAge] = useState(null);
  const [checked, setChecked] = useState(null);
  // console.log(user);

  const submit = () => {
    fetch(`${BASE_URL}/api/accounts/v1/userList/${user.id}`, {
      method: 'POST',
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
        age
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <Text style={{color: 'white', textAlign: 'center', fontSize: 20}}>
        Hello, {user?.full_name || 'Buddy'}
      </Text>
      <Text style={{color: 'white', textAlign: 'center', fontSize: 16}}>
        Update your profile here
      </Text>
      <KeyboardAvoidingView style={{width: 350}} behavior="padding">
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
              checked={checked === 'male' && true}
              onPress={() => {
                setChecked('male');
              }}
            />
          </View>
          <View>
            <CheckBox
              center
              title="Female"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={checked === 'female' && true}
              onPress={() => {
                setChecked('female');
              }}
            />
          </View>
        </View>
        <View style={{marginTop: 30}}>
          <Button title="Save" onPress={submit} />
        </View>
        <View style={{height: 100}}></View>
      </KeyboardAvoidingView>
    </View>
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
  },
  inputContainer: {},
  input: {
    fontSize: 14,
    color: 'white',
  },
});
