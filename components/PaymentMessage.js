import React, {useState} from 'react';
import {Button, Text, View} from 'react-native';
import Modal from 'react-native-modal';

const PaymentMsgModal = ({open, onClose, navigation}) => {
  return (
    <View>
      <Modal
        onBackButtonPress={onClose}
        animationInTiming={600}
        backdropColor="white"
        isVisible={open}>
        <View
          style={{
            backgroundColor: 'white',
            height: 200,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            padding: 5,
          }}>
          <Text style={{textAlign: 'center', fontSize: 14}}>
            You are not subscribed.
          </Text>
          <Text style={{textAlign: 'center', fontSize: 14, marginBottom: 20}}>
          Please Subscribe first to watch the videos.
          </Text>
          <Button
            title="Go to Payment"
            onPress={() => {
              navigation.navigate('Payment');
              onClose();
            }}
            containerStyle={{
              borderRadius: 10,
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

export default PaymentMsgModal;
