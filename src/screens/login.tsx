/* eslint-disable prettier/prettier */
import React from 'react';
import { Button,TextInput, View,TouchableWithoutFeedback, Keyboard,Image, StyleSheet, Text} from 'react-native';
import { Formik } from 'formik';

function Login():JSX.Element {
  return (
    <View style={styles.root}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Image style={styles.logo} source={require('../assets/loginScreen.png')} />
      </TouchableWithoutFeedback>
      <Formik
        initialValues={{email:'',password:''}}
        onSubmit={(values)=>{
          console.log('email ->',values.email);
          console.log('password ->',values.password);
        }}
      >
        {({handleChange,handleSubmit,values})=>(
          <View>
            <TextInput placeholder="Email" keyboardType="email-address" onChangeText={handleChange('email')} value={values.email}/>
            <TextInput placeholder="Password" secureTextEntry={true} onChangeText={handleChange('password')} value={values.password}/>
            <Button onPress={handleSubmit} title="Login"/>
          </View>
        )}
      </Formik>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Text>New to ....?</Text>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  root:{
    // justifyContent:'center',
    alignItems:'center',
  },
  logo:{
    height:250,
    width:350,
  },
})

export default Login;
