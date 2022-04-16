import React, {useState} from 'react';
import {Alert, Image, ScrollView, TextInput, View} from 'react-native';
import {CardField, useConfirmPayment} from '@stripe/stripe-react-native';
import {Button, Input} from 'react-native-elements';
import {Screen} from 'react-native-screens';
import {BASE_URL} from '@env';
import {useSelector} from 'react-redux';
import { setPaymentSuccess } from '../data/setPaymentSuccess';

export default function PaymentsUICompleteScreen({navigation}) {
  const {access_token} = useSelector(state => state.videos);
  const {confirmPayment, loading} = useConfirmPayment();
  const [email, setEmail] = useState('');
  const [loader, setLoader] = useState(false);

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(
      `${BASE_URL}/api/category/v1/native-checkout-session/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${access_token}`,
        },
      },
    );
    const {client_secret} = await response.json();
    return {
      client_secret,
    };
  };

  const openPaymentSheet = async () => {
    setLoader(true);
    const {client_secret} = await fetchPaymentSheetParams();
    const {error, paymentIntent} = await confirmPayment(client_secret, {
      type: 'Card',
      billingDetails: {email},
    });

    if (error) {
      Alert.alert(error.message);
      setLoader(false);
    } else if (paymentIntent) {
      Alert.alert('Success', `Payment successful`);
      if(paymentIntent.status == 'Succeeded') {
        setPaymentSuccess(access_token, navigation);
        setLoader(false);
      }
    }
  };

  return (
    <ScrollView style={{}}>
      <View
        style={{alignItems: 'center'}}>
        <View style={{width: 300}}>
          <Image
            style={{
              width: 300,
              height: 200,
              // marginHorizontal: 'auto',
              resizeMode: 'center',
              // borderRadius: 10,
              marginBottom: 10,
            }}
            source={require('../assets/images/payment.png')}
          />
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChangeText={text => setEmail(text)}
            style={{color: 'black', fontSize: 14}}
          />
          <CardField
            postalCodeEnabled={false}
            cardStyle={{
              backgroundColor: '#FFFFFF',
              textColor: '#000000',
              borderColor: 'lightgray',
              borderWidth: 2,
            }}
            style={{
              width: '100%',
              height: 60,
              marginBottom: 30,
              marginTop: 10,
            }}
          />
          <Button
            variant="primary"
            disabled={loader}
            title="Checkout"
            onPress={openPaymentSheet}
          />
        </View>
      </View>
      {/* <Button title="test" /> */}
    </ScrollView>
  );
}
