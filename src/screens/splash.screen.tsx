import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { StyledSafeAreaView } from '../styles/index';

function Splash (): JSX.Element {
  return (
    <StyledSafeAreaView className={'h-screen flex items-center justify-center'}>
        <Image source={require('../assets/logo.png')} style={styles.logo}/>
  </StyledSafeAreaView>

  );
}

const styles = StyleSheet.create({
  logo: {
    width: '60%',
    height: '30%'
  }
});

export default Splash;
