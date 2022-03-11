import React, {useState} from 'react';
import {Button, Text, View} from 'react-native';
// import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import Modal from 'react-native-modal';

const CustomModal = ({open, onClose, children, navigation}) => {
  // const [modalVisible, setModalVisible] = useState(false);
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
            // flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{textAlign: 'center', fontSize: 14}}>
            Registration Done Successfully
          </Text>
          <Text style={{textAlign: 'center', fontSize: 14, marginBottom: 20}}>
            You can login now
          </Text>
          <Button
            title="Login"
            onPress={() => {
              navigation.navigate('Login');
              onClose();
            }}
            // style={{}}
          />
        </View>
      </Modal>
    </View>
  );
};

export default CustomModal;

// const styles = StyleSheet.create({
//   // centeredView: {
//   //   flex: 1,
//   //   justifyContent: 'center',
//   //   alignItems: 'center',
//   //   marginTop: 22,
//   // },
//   // modalView: {
//   //   margin: 20,
//   //   backgroundColor: 'white',
//   //   borderRadius: 20,
//   //   padding: 35,
//   //   alignItems: 'center',
//   //   shadowColor: '#000',
//   //   shadowOffset: {
//   //     width: 0,
//   //     height: 2,
//   //   },
//   //   shadowOpacity: 0.25,
//   //   shadowRadius: 4,
//   //   elevation: 5,
//   // },
//   // button: {
//   //   borderRadius: 20,
//   //   padding: 10,
//   //   elevation: 2,
//   // },
//   // buttonOpen: {
//   //   backgroundColor: '#F194FF',
//   // },
//   // buttonClose: {
//   //   backgroundColor: '#2196F3',
//   // },
//   // textStyle: {
//   //   color: 'white',
//   //   fontWeight: 'bold',
//   //   textAlign: 'center',
//   // },
//   // modalText: {
//   //   marginBottom: 15,
//   //   textAlign: 'center',
//   // },
// });
