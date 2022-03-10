import React, {useState} from 'react';
import {Button, Text, View} from 'react-native';
// import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import Modal from 'react-native-modal';

const CustomModal = ({open, onClose, children}) => {
  // const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
      <Modal
        backdropColor="white"
        isVisible={open}
        style={{
          width: 300,
          height: 300,
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{flex: 1}}>
          <Text>I am the modal content!</Text>
          <Button title="Close" onPress={onClose} />
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
