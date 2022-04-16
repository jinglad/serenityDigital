import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import UpdateProfileOne from '../components/UpdateProfileOne'

const UpdateProfile = ({navigation}) => {
  return (
    <>
     <UpdateProfileOne navigation={navigation} /> 
    </>
  )
}

export default UpdateProfile

const styles = StyleSheet.create({})