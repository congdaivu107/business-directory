import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'

export default function LoginScreen() {
  return (
    <View>
      <View 
      ></View>
      <View style={styles.subContainer}>
        <Text style={{
          fontSize: 40,
          fontFamily:'outfit-bold',
          textAlign:'center'
        }}>Your Ultimate 
          <Text style={{
            color: Colors.PRIMARY,
            
          }}> Community Business Directory</Text> App</Text>
          <Text style={{
            fontSize: 15,
            fontFamily: 'outfit',
            textAlign:'center',
            marginVertical: 15,
            color: Colors.GRAY
          }}>Find your favorite business near your and post your own business to your community</Text>
      
       <TouchableOpacity style={styles.btn}>
        <Text style={{
          textAlign:'center',
          color:"#fff",
          fontFamily:'outfit'
        }}> Let's Get Started</Text>
       </TouchableOpacity>
       </View>
    </View>
  )
}
const styles = StyleSheet.create({
  subContainer: {
    backgroundColor: "#fff",
    padding: 20,
    marginTop: -20,
  },
  btn:{
    backgroundColor: Colors.PRIMARY,
    padding: 16,
    borderRadius: 99,
    marginTop: 20
  }
})