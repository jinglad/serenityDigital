import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const NewPass = () => {
  return (
    <View style={styles.container}>
      <Text>NewPass</Text>
    </View>
  )
}

export default NewPass

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#232c38',
  },
})